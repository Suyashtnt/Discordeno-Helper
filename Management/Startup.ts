import * as deps from "../deps.ts";
import { commands } from "../Storage/commands.ts";

export const startup = (token: string, prefix: string) => {
  deps.StartBot({
    token,
    intents: [deps.Intents.GUILD_MESSAGES, deps.Intents.GUILDS],
    eventHandlers: {
      ready: () => console.log("bot started!"),
      messageCreate: (msg) => {
        const splitableMsg = msg.content.replace(prefix, "");
        const CommandName = splitableMsg.split(" ")[0];
        const Args = splitableMsg.split(" ");
        Args.shift();

        if (msg.content.startsWith(prefix)) {
          commands.map((cmd) => {
            if (cmd.command == CommandName) {
              console.log(`running ${cmd.command}`);
              cmd.runs(msg, Args);
            } else if (
              cmd.aliases != undefined &&
              arrayContains(CommandName, cmd.aliases)
            ) {
              console.log(`running ${cmd.command}`);
              cmd.runs(msg, Args);
            }
          });
        }
      },
    },
  });
};

function arrayContains(needle: string, arrhaystack: string | any[]) {
  return arrhaystack.indexOf(needle) > -1;
}
