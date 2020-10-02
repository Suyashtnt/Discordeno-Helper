// deno-lint-ignore-file
import type { Message } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/message.ts';
import { inhibitor } from './inhibitor.ts';

/**
 * Type used for CreateCommand
 */
export interface command {
	command: string;
	aliases?: string[];
	args?: string[];
	inhibitors?: inhibitor[];
	desc: string;
	runs: (Msg: Message, Args?: string[]) => any;
	cooldown?: number;
}
