import { createCommand } from "../../../Utils/CreateCommand.ts";
import { sendMessage } from "https://x.nest.land/Discordeno@9.0.1/src/handlers/channel.ts";

export default createCommand({
  command: "yeet",
  desc: "YEET!",
  args: ["[person to YEET]"],
  aliases: ["y"],
  runs: (msg, args) => {
    if (args != null && args[0] != undefined)
      sendMessage(msg.channelID, `yeeted ${args[0]}`);
    else sendMessage(msg.channelID, "please enter a person to yeet");
  },
});
