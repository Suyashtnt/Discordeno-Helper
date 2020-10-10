import { categories, commands } from '../Storage/commands.ts';
import { createCommand } from './CreateCommand.ts';
import { MessageEmbed } from './embed.ts';
import { sendMessage } from 'https://x.nest.land/Discordeno@9.0.1/src/handlers/channel.ts';
import { pf } from '../Managment/Startup.ts';
import type { command } from '../mod.ts';

// inspired by dank memer
/**
 * Creates a generative help command so you dont have to manually manage enteries or make one by yourself
 * @param commandPrefix The prefix for the help command
 * @param aliases Aliases for the help command
 */
export function createHelpCommand(
	commandPrefix: string,
	category: string,
	aliases?: string[]
) {
	createCommand({
		command: commandPrefix,
		desc: 'Help command',
		aliases: aliases ? aliases : undefined,
		runs: async (msg, args) => {
			const helpBody = new MessageEmbed();

			helpBody.setTitle('All commands');
			if (args) {
				if (args[0]) {
					console.log(args[0]);
					commands.forEach((val) => {
						if (
							val.command === args[0] ||
							(val.aliases ? val.aliases : '') === args[0]
						) {
							sendMessage(msg.channelID, {
								embed: new MessageEmbed()
									.setTitle(
										`${val.command} ${val.args ? val.args.join(' ') : ''}`
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
					const embed = new MessageEmbed();
					await Promise.all(
						categories.map(async (cate) => {
							const currentCmds: command[] = [];

							commands.forEach((cmd) => {
								if (cmd.category === cate) {
									currentCmds.push(cmd);
								}
							});

							const fields = await Promise.all(
								currentCmds.map((cmd) => {
									if (!cmd.args) {
										return `\`${pf}${cmd.command}\` - ${cmd.desc}`;
									} else {
										return `\`${cmd.customPrefix ? cmd.customPrefix : pf}${
											cmd.command
										} ${cmd.args.join(' ')}\` - ${cmd.desc}`;
									}
								})
							);
							embed.addField(cate, fields.join('\n'), true);
						})
					);
					sendMessage(msg.channelID, {
						embed: embed,
					});
				}
			}
		},
		category,
	});
}
