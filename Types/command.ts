// deno-lint-ignore-file
import type { Message } from 'https://x.nest.land/Discordeno@9.0.1/src/structures/message.ts';
import { Permission } from 'https://x.nest.land/Discordeno@9.0.1/src/types/permission.ts';
import { inhibitor } from './inhibitor.ts';

/**
 * Type used for CreateCommand
 */
export interface command {
	/**
	 * The command name
	 *
	 * @example a command with the name of `something` and a prefix of `e.` will execute this command if the message starts `e.something`
	 */
	command: string;
	/**
	 * The command aliases
	 * This does not ovveride the base name
	 * @example a command with the aliases of `some` and `thing and a prefix of `e.` will execute this command if the message starts with `e.some` or `e.thing`
	 */
	aliases?: string[];
	/**
	 * The arguments, used for the help command generator.
	 */
	args?: string[];
	/**
	 * The commands inhibitors
	 *
	 * If all inhibitors return true than the command will run
	 */
	inhibitors?: inhibitor[];
	/**
	 * The description, used for the help command generator
	 */
	desc: string;
	/**
	 * What this command runs
	 */
	runs: (Msg: Message, Args?: string[]) => any;
	/**
	 * The commands cooldown
	 */
	cooldown?: number;
	/**
	 * The permissions the bot needs to run this command
	 */
	botPerms?: Permission[];
	/**
	 * the permissions the user needs to run this command
	 */
	userPerms?: Permission[];
	/**
	 * Ovverides the default prefix
	 *
	 * @example if the main prefix is `e.` and this is set to `e!` and the command name is `e` then `e.e` wont work but `e!e` will
	 */
	customPrefix?: string;
}
