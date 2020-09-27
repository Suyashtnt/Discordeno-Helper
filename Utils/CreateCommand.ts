import { commands } from "../Storage/commands.ts";
import { command } from "../Types/command.ts";

/**
 * Adds a command
 * @param command The command info
 */
export const createCommand = (command: command) => {
  commands.push(command);
  return command;
};
