import type { Message } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/message.ts';

export interface monitor {
	desc: string;
	// deno-lint-ignore no-explicit-any
	runs: (msg: Message) => any;
}
