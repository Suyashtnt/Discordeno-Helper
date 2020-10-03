import { EventHandlers as OldEvents } from 'https://x.nest.land/Discordeno@9.0.1/src/types/options.ts';

export interface EventHandlers extends OldEvents {
	messageCreate?: undefined;
	guildCreate?: undefined;
}
