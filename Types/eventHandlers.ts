import type { EventHandlers as OldEvents } from 'https://x.nest.land/Discordeno@9.4.0/src/types/options.ts';

/**
 * Event Handlers minus ones the bot uses
 * @see https://doc.deno.land/https/x.nest.land/Discordeno@9.4.0/src/types/options.ts#EventHandlers
 */
export interface EventHandlers extends OldEvents {
	messageCreate?: undefined;
	guildCreate?: undefined;
}
