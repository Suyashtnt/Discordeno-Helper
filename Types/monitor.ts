import type { Message } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/message.ts';
import type { message } from './message.ts';

/**
 * The monitor type
 */
export interface monitor {
	/**
	 * The descrition/name of the monitor
	 */
	desc: string;
	/**
	 * What it runs
	 */
	// deno-lint-ignore no-explicit-any
	runs: (msg: message) => any;
}
