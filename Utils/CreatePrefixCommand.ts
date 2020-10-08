import { createCommand } from './CreateCommand.ts';
import { sendMessage } from 'https://x.nest.land/Discordeno@9.0.1/src/handlers/channel.ts';
import * as db from '../db/db.ts';
import type { MessageContent } from 'https://x.nest.land/Discordeno@9.0.1/src/types/channel.ts';
import type { Message } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/message.ts';
import guildOnly from '../inhibitors/guildOnly.ts';
/**
 * Creates a Prefix command for you
 * @param commandPrefix The prefix for the command
 * @param aliases The command aliases
 * @param returnMsg A custom return message
 */
export function createPrefixCommand(
	commandPrefix: string,
	aliases?: string[],
	returnMsg?:
		| ((msg: Message) => string | MessageContent)
		| string
		| MessageContent
) {
	createCommand({
		command: commandPrefix,
		desc: 'Set The prefix',
		args: ['[new prefix]'],
		aliases: aliases ? aliases : undefined,
		runs: async (msg, args) => {
			if (args && args[0]) {
				db.setPrefix(args[0], msg.guildID).then(() =>
					sendMessage(
						msg.channelID,
						returnMsg
							? typeof returnMsg === 'function'
								? returnMsg(msg)
								: returnMsg
							: 'Updated successully'
					)
				);
			} else {
				sendMessage(msg.channelID, 'Please enter the new prefix!');
			}
		},
		userPerms: ['ADMINISTRATOR'],
		inhibitors: [guildOnly],
	});
}
