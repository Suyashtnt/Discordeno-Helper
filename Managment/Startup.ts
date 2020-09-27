import * as deps from "../deps.ts";
import { commands } from "../Storage/commands.ts";
import { Logger } from "https://deno.land/x/optic/mod.ts";
import { cache } from "https://x.nest.land/Discordeno@9.0.1/src/utils/cache.ts";
const logger = new Logger();
/**
 * Starts up your bot
 * @param token Your Bot Token
 * @param prefix The Bots prefix
 */
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
              logger.info(
                `running ${cmd.command} in ${cache.guilds.get(msg.guildID)
                  ?.name}(channel is ${cache.channels.get(msg.channelID)
                  ?.name}) for ${msg.author.username}`,
              );
              cmd.runs(msg, Args);
            } else if (
              cmd.aliases != undefined &&
              arrayContains(CommandName, cmd.aliases)
            ) {
              logger.info(
                `running ${cmd.command} in ${cache.guilds.get(msg.guildID)
                  ?.name}(channel is ${cache.channels.get(msg.channelID)
                  ?.name}) for ${msg.author.username}`,
              );
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
