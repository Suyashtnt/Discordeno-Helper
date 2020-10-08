import { commands } from '../Storage/commands.ts';
import type { command } from '../Types/command.ts';

/**
 * Adds a command
 * @param command The command info
 */
export function createCommand(command: command) {
	commands.push(command);
	return command;
}
