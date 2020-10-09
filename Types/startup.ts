import { EventHandlers } from './eventHandlers.ts';
export interface startup {
	token: string;
	prefix: string;
	botID: string;
	useMongoDB: boolean;
	eventHandlers: EventHandlers;
	imports: {
		cmdDir: string;
		monitorDir: string;
	};
}
