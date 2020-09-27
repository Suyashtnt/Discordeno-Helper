import { createCommand } from "../../../utils/CreateCommand.ts";
import { sendMessage } from "https://x.nest.land/Discordeno@9.0.1/src/handlers/channel.ts";

export default createCommand({
  command: "ask",
  desc: "ask something",
  runs: (msg) => {
    if (Math.random() > 0.5) {
      return sendMessage(msg.channelID, "yes");
    } else {
      return sendMessage(msg.channelID, "no");
    }
  },
});