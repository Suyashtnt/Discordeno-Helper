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
export function createHelpCommand(commandPrefix: string, aliases?: string[]) {
	createCommand({
		command: commandPrefix,
		desc: 'Help command',
		aliases: aliases ? aliases : undefined,
		runs: (msg, args) => {
			const helpBody = new MessageEmbed();

			helpBody.setTitle('All commands');
			if (args) {
				if (args[0]) {
					console.log(args[0]);
					commands.map((val) => {
						console.log(
							(val.command === args[0] ||
								(val.aliases ? val.aliases : '') === args[0]) +
								' cmd name is' +
								val.command
						);

						if (
							val.command === args[0] ||
							(val.aliases ? val.aliases : '') === args[0]
						) {
							sendMessage(msg.channelID, {
								embed: new MessageEmbed()
									.setTitle(
										val.command + ' ' + (val.args ? val.args.join(' ') : '')
									)
									.setDescription(val.desc)
									.addField(
										'aliases',
										val.aliases ? val.aliases?.join(', ') : 'none'
									),
							});
						}
					});
				} else {
					commands.map((val) => {
						if (val.args) {
							const args = val.args.join(' ');
							helpBody.addField(
								`\`${prefix}${val.command} ${args} \``,
								val.desc,
								true
							);
						} else {
							helpBody.addField(`\`${prefix}${val.command}\``, val.desc, true);
						}
					});
					sendMessage(msg.channelID, {
						embed: helpBody,
					});
				}
			}
		},
	});
}

// deno-lint-ignore no-explicit-any
function arrayContains(needle: string, arrhaystack: string | any[]) {
	return arrhaystack.indexOf(needle) > -1;
}
