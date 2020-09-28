import type { Message } from "discordeno/structures/message.ts";

/**
 * Type used for CreateCommand
 */
export interface command {
  command: string;
  aliases?: string[];
  args?: string[];
  desc: string;
  runs: (Msg: Message, Args?: string[]) => any;
}
