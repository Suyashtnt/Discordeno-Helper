// deno-lint-ignore-file
import type { Message } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/message.ts';
import type { Channel } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/channel.ts';
import type { Guild } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/guild.ts';

/**
 * custom interface for messages based on the original one
 */
export interface message extends Message {
	/**
	 * messages channel
	 */
	channel?: Channel;
	/**
	 * the messages guild if applicable
	 */
	guild?: Guild;
	/**
	 * Sends a message to the original channel and pings the author
	 */
	reply: (message: string) => any;
	/**
	 * Sends a message to the original channel
	 */
	return: (mesage: string) => any;
}
