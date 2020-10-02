import type { Message } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/message.ts';
import { command } from './command.ts';

export interface inhibitor {
	desc: string;
	runs: (cmd: command, msg: Message, args: string[]) => boolean;
}
