import { logger } from '../Managment/Startup.ts';
import { categories, commands } from '../Storage/commands.ts';
import type { command } from '../Types/command.ts';

/**
 * Adds a command
 * @param command The command info
 */
export default async function createCommand(command: command) {
	const uid = logger.debug(randomNumber(1, 1000000));

	const cmd: command = {
		...command,
		id: uid,
	};

	commands.set(cmd.command, cmd);
	if (categories.find((cate) => cate === cmd.category)) {
		categories.push(cmd.category);
	}
	return cmd;
}

function randomNumber(min: number, max: number) {
	return Math.random() * (max - min) + min;
}
