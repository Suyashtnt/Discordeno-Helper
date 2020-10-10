import { EventHandlers } from './eventHandlers.ts';
/**
 * Interface for starting up the bot
 */
export interface startup {
	/**
	 * your bots token
	 */
	token: string;
	/**
	 * your bots prefix
	 */
	prefix: string;
	/**
	 * your bots userID
	 */
	botID: string;
	/**
	 * If you are using the db manager
	 */
	useMongoDB?: boolean;
	/**
	 * The event handlers
	 */
	eventHandlers?: EventHandlers;
	/**
	 * The imports
	 */
	imports: {
		/**
		 * the folder where your commands are
		 */
		cmdDir: string;
		/**
		 * the folder where your monitors are
		 */
		monitorDir: string;
	};
}
