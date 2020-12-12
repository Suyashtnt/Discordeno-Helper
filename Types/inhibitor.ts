import type { Message } from 'https://x.nest.land/Discordeno@9.4.0/src/structures/message.ts';
import type { command } from './command.ts';
import type { message } from './message.ts';

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
	/**
	 * desc/name of inhibitor
	 */
	desc: string;
	/**
	 * what it runs
	 *
	 * if it returns tre the command will run, else it wont
	 */
	runs: (cmd: command, msg: message, args: string[]) => boolean;
}
