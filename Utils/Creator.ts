import type { MessageContent } from 'https://x.nest.land/Discordeno@9.4.0/src/types/channel.ts';
import type { Message } from 'https://x.nest.land/Discordeno@9.4.0/src/structures/message.ts';
import { command } from '../Types/command.ts';
import createCommand from './CreateCommand.ts';
import createPrefixCommand from './CreatePrefixCommand.ts';
import createHelpCommand from './CreateHelpCommand.ts';

const creator = {
	createCommand: createCommand,
	CreatePrefixCommand: createPrefixCommand,
	CreateHelpCommand: createHelpCommand,
};
export default creator;
