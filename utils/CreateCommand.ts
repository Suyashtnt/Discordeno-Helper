import { commands } from "../storage/commands.ts";
import { command } from "../types/command.ts";

export const createCommand = (command: command) => {
  commands.push(command);
  return command;
};
