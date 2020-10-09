import { categories, commands } from '../Storage/commands.ts';
import type { command } from '../Types/command.ts';

/**
 * Adds a command
 * @param command The command info
 */
export function createCommand(command: command) {
	commands.set(command.command, command);
	if (arrayContains(command.category, categories) === false) {
		categories.push(command.category);
	}
	return command;
}

// deno-lint-ignore no-explicit-any
function arrayContains(needle: string, arrhaystack: string | any[]) {
	return arrhaystack.indexOf(needle) > -1;
}
