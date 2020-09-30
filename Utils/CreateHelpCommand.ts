import { commands } from '../Storage/commands.ts';
import { createCommand } from './CreateCommand.ts';
import { MessageEmbed } from './embed.ts';
import { sendMessage } from 'https://x.nest.land/Discordeno@9.0.1/src/handlers/channel.ts';
import { prefix } from '../Managment/Startup.ts';

// inspired by my own bot https://i.imgur.com/6hfNkZl.png
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
		runs: (msg, args) => {
			const helpBody = new MessageEmbed();

			helpBody.setTitle('All commands');

			if (args && args[0]) {
				if (arrayContains(args[0], commands)) {
					commands.map((val) => {
						sendMessage(msg.channelID, {
							embed: new MessageEmbed()
								.setTitle(val.command + ' ' + val.args?.join(' '))
								.setDescription(val.desc)
								.addField(
									'aliases',
									val.aliases ? val.aliases?.join(' ') : 'none'
								),
						});
					});
				}
			} else {
				commands.map((val) => {
					if (val.args) {
						const args = val.args.join(' ');
						helpBody.addField(`\`${prefix}${val.command} ${args} \``, val.desc);
					} else {
						helpBody.addField(`\`${prefix}${val.command}\``, val.desc);
					}
				});
				sendMessage(msg.channelID, {
					embed: helpBody,
				});
			}
		},
	});
};

// deno-lint-ignore no-explicit-any
function arrayContains(needle: string, arrhaystack: string | any[]) {
	return arrhaystack.indexOf(needle) > -1;
}
