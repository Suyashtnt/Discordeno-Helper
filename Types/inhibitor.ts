import type { Message } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/message.ts';
import { command } from './command.ts';

/**
 * The inhibitor type
 * If all inhibitors return true than the command will run
 * @example ```ts
 * const inhib: inhibitor = {
 * 	desc: 'something',
 * 	runs: (cmd, msg, args) =. true
 * }
 * ```
 */
export interface inhibitor {
	desc: string;
	runs: (cmd: command, msg: Message, args: string[]) => boolean;
}
