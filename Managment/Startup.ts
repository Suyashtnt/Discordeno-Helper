// deno-lint-ignore-file
import { commands } from '../Storage/commands.ts';
import type { command } from '../Types/command.ts';
import {
	ConsoleStream,
	Formatter,
	getColorForLevel,
	Level,
	levelToName,
	Logger,
	LogRecord,
} from 'https://deno.land/x/optic@0.19/mod.ts';
import { cache } from 'https://x.nest.land/Discordeno@9.4.0/src/utils/cache.ts';
import { getPrefix, humanizeDelta, setPrefix } from '../mod.ts';
import type { Message } from 'https://x.nest.land/Discordeno@9.4.0/src/structures/message.ts';
import { sendMessage } from 'https://x.nest.land/Discordeno@9.4.0/src/handlers/channel.ts';
import type { inhibitor } from '../Types/inhibitor.ts';
import { monitors } from '../Storage/monitors.ts';
import {
	botHasPermission,
	memberHasPermission,
} from 'https://x.nest.land/Discordeno@9.4.0/src/utils/permissions.ts';
import {
	Permission,
	Permissions,
} from 'https://x.nest.land/Discordeno@9.4.0/src/types/permission.ts';
import type { Guild } from 'https://x.nest.land/Discordeno@9.4.0/src/structures/guild.ts';
import createClient from 'https://x.nest.land/Discordeno@9.4.0/src/module/client.ts';
import { Intents } from 'https://x.nest.land/Discordeno@9.4.0/src/types/options.ts';
import type { startup as startupInterface } from '../Types/startup.ts';
import type { message } from '../Types/message.ts';
import importDirectory from '../Utils/ImportFromDir.ts';

class MyFormatter implements Formatter<String> {
	format(logRecord: LogRecord): string {
		const colourize = getColorForLevel(logRecord.level);
		let time = logRecord.dateTime.toLocaleDateString().split(' ');
		time.splice(0, 1);
		return colourize(
			`${levelToName(logRecord.level)}: ${time.join(' ')} ${
				logRecord.dateTime.toLocaleTimeString().split(' ')[0]
			} > ${logRecord.msg} ${
				String(logRecord.metadata) === '' ? '' : `| ${logRecord.metadata}`
			}`
		);
	}
}

export const logger = new Logger().withMinLogLevel(Level.Info);
logger.addStream(new ConsoleStream().withFormat(new MyFormatter()));
export let intents = [
	Intents.GUILD_MESSAGES,
	Intents.GUILDS,
	Intents.DIRECT_MESSAGES,
];
export let pf: string;
const used = new Map<number, number>();
/**
 * Starts up your bot
 * @param token Your Bot Token
 * @param prefix The Bots prefix
 * @param botID your bots id
 * @param useMongo If you are using the MongoDB prefix manager
 */
export default async function startup({
	botID,
	prefix,
	token,
	eventHandlers,
	imports,
	useMongoDB,
}: startupInterface) {
	await importDirectory(Deno.realPathSync(imports.cmdDir));
	await importDirectory(Deno.realPathSync(imports.monitorDir));
	let allIDs: number[] = [];
	await Promise.resolve(
		commands.forEach((cmd) => {
			if (cmd.id) {
				if (allIDs.find((id) => id === cmd.id)) {
					throw new Error('2 commands have the same ID. Will now terminate');
				}
				allIDs.push(cmd.id);
			} else {
				throw new Error('This command does not have an ID. Will now terminate');
			}
		})
	);
	createClient({
		token,
		intents,
		eventHandlers: {
			ready: () => logger.info('bot started!'),
			messageCreate: async (mssg) => {
				if (mssg.author.bot) {
					return;
				}
				const dbGet = logger.debug(
					await getPrefix(mssg.guildID),
					'get prefix from db'
				);
				pf = logger.debug(
					useMongoDB ? (dbGet ? dbGet : prefix) : prefix,
					'the current prefix'
				);

				const guild =
					mssg.guildID != '' ? cache.guilds.get(mssg.guildID) : undefined;

				const msg: message = {
					...mssg,
					channel: cache.channels.get(mssg.channelID),
					guild,
					reply: (mssg) =>
						sendMessage(msg.channelID, `<@${msg.author.id}> ${mssg}`),
					return: (mssg) => sendMessage(msg.channelID, mssg),
				};

				monitors.map(async (monitor) => {
					logger.debug('running ' + monitor.desc);
					monitor.runs(msg);
				});

				let cmd: command;

				await Promise.resolve(
					commands.forEach((command) => {
						if (
							command.command ===
								logger.debug(
									msg.content
										.replace(
											command.customPrefix ? command.customPrefix : pf,
											''
										)
										.split(' ')[0]
								) ||
							(command.aliases ? command.aliases : []).find(
								(alias) =>
									msg.content
										.replace(
											command.customPrefix ? command.customPrefix : pf,
											''
										)
										.split(' ')[0] === alias
							)
						) {
							const out = commands.get(command.command);
							if (out) {
								cmd = out;
							}
						}
					})
				).then(async () => {
					logger.debug(cmd);

					if (cmd) {
						const Args = logger.debug(
							msg.content
								.replace(cmd.customPrefix ? cmd.customPrefix : pf, '')
								.split(' '),
							'Get args and cmdName'
						);
						const CommandName = logger.debug(Args.shift(), {
							type: 'cmd name',
						});

						const cooldown = logger.debug(
							used.get(Number(msg.author.id) + (cmd.id ? cmd.id : 0)),
							'cooldown'
						);

						if (
							msg.content.startsWith(cmd.customPrefix ? cmd.customPrefix : pf)
						) {
							if (cooldown) {
								const remaining = humanizeDelta(cooldown - Date.now());
								sendMessage(
									msg.channelID,
									`You need to wait ${remaining} before using this command again!`
								);
							} else {
								if (
									cmd.command == CommandName ||
									(cmd.aliases != undefined &&
										cmd.aliases.find(
											(alias) =>
												(CommandName
													? CommandName
													: 'this should not happen') === alias
										) &&
										(cmd.inhibitors
											? await testInhibitors(cmd.inhibitors, [cmd, msg, Args])
											: true))
								) {
									if (guild ? await checkForPerms(cmd, msg, guild) : true) {
										logger.info(
											`running ${cmd.command} in ${
												cache.guilds.get(msg.guildID)?.name
											}(channel is ${
												cache.channels.get(msg.channelID)?.name
											}) for ${msg.author.username}`
										);
										cmd.runs(msg, Args);
										logger.debug(cmd.cooldown, 'cooldown of cmd');
										used.set(
											logger.debug(
												Number(msg.author.id) + (cmd.id ? cmd.id : 0)
											),
											Date.now() + (cmd.cooldown ? cmd.cooldown : 0)
										);
										logger.debug(used, 'used map');
										logger.debug(
											used.get(Number(msg.author.id) + (cmd.id ? cmd.id : 0))
										);
										setTimeout(
											() => {
												used.delete(
													Number(msg.author.id) + (cmd.id ? cmd.id : 0)
												);
											},
											cmd.cooldown ? cmd.cooldown : 0
										);
									}
								}
							}
						}
					}
				});
				if (msg.mentions[0] === botID) {
					sendMessage(msg.channelID, `the bot prefix is \`${pf}\``);
				}
			},
			guildCreate: (guild) => {
				if (useMongoDB) {
					setPrefix(pf, guild.id);
				}
			},
			...eventHandlers,
		},
	});
}

// deno-lint-ignore no-explicit-any
async function testInhibitors(
	array: inhibitor[],
	args: [cmd: command, msg: message, args: string[]]
) {
	let AllWorking = true;

	await Promise.all(
		array.map(async (element) => {
			logger.debug('checking ' + element.desc);
			//@ts-ignore
			if (element.runs(...args) === false) {
				AllWorking = false;
			}
		})
	);

	return AllWorking;
}

function missingCommandPermission(
	message: Message,
	missingPermissions: Permission[],
	type:
		| 'framework/core:USER_SERVER_PERM'
		| 'framework/core:USER_CHANNEL_PERM'
		| 'framework/core:BOT_SERVER_PERM'
		| 'framework/core:BOT_CHANNEL_PERM'
) {
	const perms = missingPermissions.join(', ');
	const response =
		type === 'framework/core:BOT_CHANNEL_PERM'
			? `I am missing the following permissions in this channel: **${perms}**`
			: type === 'framework/core:BOT_SERVER_PERM'
			? `I am missing the following permissions in this server from my roles: **${perms}**`
			: type === 'framework/core:USER_CHANNEL_PERM'
			? `You are missing the following permissions in this channel: **${perms}**`
			: `You are missing the following permissions in this server from your roles: **${perms}**`;

	if (!missingPermissions.includes('SEND_MESSAGES')) {
		sendMessage(message.channelID, response);
	}
}

async function checkForPerms(cmd: command, msg: Message, guild?: Guild) {
	if (!cmd.botPerms?.length && !cmd.userPerms?.length) {
		return true;
	} else if (!guild) {
		return true;
	}
	if (cmd.userPerms?.length) {
		const missingPerms = cmd.userPerms.filter((perm) => {
			return !memberHasPermission(
				msg.author.id,
				guild,
				msg.member?.roles || [],
				[perm]
			);
		});

		if (missingPerms.length) {
			missingCommandPermission(
				msg,
				missingPerms,
				'framework/core:USER_SERVER_PERM'
			);
			return false;
		}
	}
	if (cmd.botPerms?.length) {
		if (await botHasPermission(msg.guildID, [Permissions['ADMINISTRATOR']])) {
			return true;
		} else {
			const missingPerms = cmd.botPerms.filter(async (perm) => {
				return await botHasPermission(msg.guildID, [Permissions[perm]]);
			});

			if (missingPerms.length) {
				missingCommandPermission(
					msg,
					missingPerms,
					'framework/core:BOT_SERVER_PERM'
				);
				return false;
			}
		}
	}
	return true;
}

/**
 * Adds a bot intent
 * @see
 * @param intent The intent to add
 */
export function addIntent(intent: Intents) {
	return intents.push(intent);
}
