import type { MessageContent } from 'https://x.nest.land/Discordeno@9.0.1/src/types/channel.ts';
import type { Message } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/message.ts';
import { command } from '../Types/command.ts';
import createCommand from './CreateCommand.ts';
import createPrefixCommand from './CreatePrefixCommand.ts';
import createHelpCommand from './CreateHelpCommand.ts';

const creator = {
	createCommand: (command: command) => createCommand(command),
	CreatePrefixCommand: (
		commandPrefix: string,
		category: string,
		aliases?: string[],
		returnMsg?:
			| ((msg: Message) => string | MessageContent)
			| string
			| MessageContent
	) => createPrefixCommand(commandPrefix, category, aliases, returnMsg),
	CreateHelpCommand: (
		commandPrefix: string,
		category: string,
		aliases?: string[]
	) => createHelpCommand(commandPrefix, category, aliases),
};
export default creator;
