import { commands } from '../Storage/commands.ts';
import { createCommand } from './CreateCommand.ts';
import { MessageEmbed } from './embed.ts';
import { sendMessage } from 'https://x.nest.land/Discordeno@9.0.1/src/handlers/channel.ts';

/**
 * Creates a generative help command so you dont have to manually manage enteries or make one by yourself
 * @param commandPrefix The prefix for the help command
 * @param aliases Aliases for the help command
 */
export const createHelpCommand = (
	commandPrefix: string,
	aliases?: string[]
) => {
	createCommand({
		command: commandPrefix,
		desc: 'Help command',
		aliases: aliases ? aliases : undefined,
		runs: (msg) => {
			const helpBody = new MessageEmbed();

			helpBody.setTitle('All commands');

			commands.map((val) => {
				if (val.args) {
					const args = val.args.join(' ');
					helpBody.addField(`\`${val.command} ${args} \``, val.desc);
				} else {
					helpBody.addField(`\`${val.command}\``, val.desc);
				}
			});
			sendMessage(msg.channelID, {
				embed: helpBody,
			});
		},
	});
};
