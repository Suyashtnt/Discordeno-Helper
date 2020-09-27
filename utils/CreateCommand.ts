import { commands } from "../Storage/commands.ts";
import { command } from "../Types/command.ts";

export const createCommand = (command: command) => {
  commands.push(command);
  return command;
};
