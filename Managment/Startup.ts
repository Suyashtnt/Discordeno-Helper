// deno-lint-ignore-file
import { commands } from '../Storage/commands.ts';
import { command } from '../Types/command.ts';
import { Logger } from 'https://deno.land/x/optic/mod.ts';
import { cache } from 'https://x.nest.land/Discordeno@9.0.1/src/utils/cache.ts';
import {
	getPrefix,
	humanizeDelta,
	importDirectory,
	setPrefix,
} from '../mod.ts';
import type { Message } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/message.ts';
import { sendMessage } from 'https://x.nest.land/Discordeno@9.0.1/src/handlers/channel.ts';
import type { inhibitor } from '../Types/inhibitor.ts';
import { monitors } from '../Storage/monitors.ts';
import {
	botHasPermission,
	memberHasPermission,
} from 'https://x.nest.land/Discordeno@9.0.1/src/utils/permissions.ts';
import {
	Permission,
	Permissions,
} from 'https://x.nest.land/Discordeno@9.0.1/src/types/permission.ts';
import { Guild } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/guild.ts';
import createClient from 'https://x.nest.land/Discordeno@9.0.1/src/module/client.ts';
import { Intents } from 'https://x.nest.land/Discordeno@9.0.1/src/types/options.ts';
import { startup as startupInterface } from '../Types/startup.ts';

const logger = new Logger();
export let intents = [
	Intents.GUILD_MESSAGES,
	Intents.GUILDS,
	Intents.DIRECT_MESSAGES,
];
export let pf: string;
const used = new Map();
/**
 * Starts up your bot
 * @param token Your Bot Token
 * @param prefix The Bots prefix
 * @param botID your bots id
 * @param useMongo If you are using the MongoDB prefix manager
 */
export async function startup({
	botID,
	prefix,
	token,
	eventHandlers,
	imports,
	useMongoDB,
}: startupInterface) {
	await importDirectory(Deno.realPathSync(imports.cmdDir));
	await importDirectory(Deno.realPathSync(imports.monitorDir));
	createClient({
		token,
		intents,
		eventHandlers: {
			ready: () => console.log('bot started!'),
			messageCreate: async (msg) => {
				const dbGet = await getPrefix(msg.guildID);
				pf = useMongoDB ? (dbGet ? dbGet : prefix) : prefix;

				monitors.map(async (monitor) => {
					monitor.runs(msg);
				});

				for (var i = 0; i < commands.length; i++) {
					const cmd = commands[i];

					const CommandName = msg.content
						.replace(cmd.customPrefix ? cmd.customPrefix : pf, '')
						.split(' ')[0];
					const Args = msg.content
						.replace(cmd.customPrefix ? cmd.customPrefix : pf, '')
						.split(' ');
					Args.shift();

					const cooldown = used.get(msg.author.id);
					const guild =
						msg.guildID != '' ? cache.guilds.get(msg.guildID) : undefined;

					if (
						msg.content.startsWith(cmd.customPrefix ? cmd.customPrefix : pf)
					) {
						if (cooldown) {
							const remaining = humanizeDelta(cooldown - Date.now());
							sendMessage(
								msg.channelID,
								`You need to wait ${remaining} before using this command again!`
							);
							break;
						} else if (
							(cmd.command == CommandName ||
								(cmd.aliases != undefined &&
									arrayContains(CommandName, cmd.aliases))) &&
							(cmd.inhibitors
								? await testInhibitors(cmd.inhibitors, [cmd, msg, Args])
								: true)
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
								used.set(
									msg.author.id,
									Date.now() + (cmd.cooldown ? cmd.cooldown : 0)
								);
								setTimeout(
									() => {
										used.delete(msg.author.id);
									},
									cmd.cooldown ? cmd.cooldown : 0
								);
								break;
							}
						}
					} else if (msg.mentions[0] === botID) {
						sendMessage(msg.channelID, `the bot prefix is \`${prefix}\``);
						break;
					}
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
function arrayContains(needle: string, arrhaystack: string | any[]) {
	return arrhaystack.indexOf(needle) > -1;
}

// deno-lint-ignore no-explicit-any
async function testInhibitors(
	array: inhibitor[],
	args: [cmd: command, msg: Message, args: string[]]
) {
	let AllWorking = true;
	console.log(array);

	await Promise.all(
		array.map(async (element) => {
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
 * Starts up your bot
 *
 * this is just startup but has a better name
 * @param token Your Bot Token
 * @param prefix The Bots prefix
 * @param botID your bots id
 * @param useMongo If you are using the MongoDB prefix manager
 */
export function startBot(params: startupInterface) {
	startup(params);
}
/**
 * Adds a bot intent
 * @see
 * @param intent The intent to add
 */
export function addIntent(intent: Intents) {
	return intents.push(intent);
}
