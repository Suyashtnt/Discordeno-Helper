import { Message } from "https://x.nest.land/Discordeno@9.0.1/src/structures/message.ts";

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
