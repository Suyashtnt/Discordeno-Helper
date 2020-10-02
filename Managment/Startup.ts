// deno-lint-ignore-file
import { commands } from '../Storage/commands.ts';
import { command } from '../Types/command.ts';
import { Logger } from 'https://deno.land/x/optic/mod.ts';
import { cache } from 'https://x.nest.land/Discordeno@9.0.1/src/utils/cache.ts';
import { getPrefix, humanizeDelta, setPrefix } from '../mod.ts';
import type { Message } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/message.ts';
import { sendMessage } from 'https://x.nest.land/Discordeno@9.0.1/src/handlers/channel.ts';
import { Intents, StartBot } from '../deps.ts';
import type { inhibitor } from '../Types/inhibitor.ts';
import { monitors } from '../Storage/monitors.ts';
const logger = new Logger();

export let prefix: string;
const used = new Map();
/**
 * Starts up your bot
 * @param token Your Bot Token
 * @param prefix The Bots prefix
 * @param botID your bots id
 * @param useMongo If you are using the MongoDB prefix manager
 */
export const startup = (
	token: string,
	pf: string,
	botID: string,
	useMongo: boolean
) => {
	StartBot({
		token,
		intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
		eventHandlers: {
			ready: () => console.log('bot started!'),
			messageCreate: async (msg) => {
				const dbGet = await getPrefix(msg.guildID);
				prefix = useMongo ? (dbGet ? dbGet : pf) : pf;

				const splitableMsg = msg.content.replace(prefix, '');
				const CommandName = splitableMsg.split(' ')[0];
				const Args = splitableMsg.split(' ');
				Args.shift();

				monitors.map(async (monitor) => {
					monitor.runs(msg);
				});
				if (msg.content.startsWith(prefix)) {
					for (var i = 0; 1 < commands.length; i++) {
						const cmd = commands[i];
						const cooldown = used.get(msg.author.id);
						if (cooldown) {
							console.log('cooldown');

							const remaining = humanizeDelta(cooldown - Date.now());
							sendMessage(
								msg.channelID,
								`You need to wait ${remaining} before using this command again!`
							);
							break;
						} else if (
							(cmd.command == CommandName &&
								(cmd.inhibitors
									? await testInhibitors(cmd.inhibitors, [cmd, msg, Args])
									: true)) ||
							(cmd.aliases != undefined &&
								arrayContains(CommandName, cmd.aliases) &&
								(cmd.inhibitors
									? await testInhibitors(cmd.inhibitors, [cmd, msg, Args])
									: true))
						) {
							logger.info(
								`running ${cmd.command} in ${
									cache.guilds.get(msg.guildID)?.name
								}(channel is ${cache.channels.get(msg.channelID)?.name}) for ${
									msg.author.username
								}`
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
				}
			},
			guildCreate: (guild) => {
				if (useMongo) {
					setPrefix(pf, guild.id);
				}
			},
		},
	});
};

// deno-lint-ignore no-explicit-any
function arrayContains(needle: string, arrhaystack: string | any[]) {
	return arrhaystack.indexOf(needle) > -1;
}

// deno-lint-ignore no-explicit-any
async function testInhibitors(
	array: inhibitor[],
	args: [cmd: command, msg: Message, args: string[]]
) {
	let AllWorking = false;

	await Promise.all(
		array.map(async (element) => {
			console.log(element.runs(...args));

			//@ts-ignore
			if (element.runs(...args) === true) {
				AllWorking = true;
			}
		})
	);

	return AllWorking;
}
