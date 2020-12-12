import { connect, startup } from '../mod.ts';
import { cache } from 'https://x.nest.land/Discordeno@9.0.1/src/utils/cache.ts';
import { config } from 'https://deno.land/x/dotenv@v0.5.0/mod.ts';
const env = config();
connect(env.MONGOURL);

startup({
	botID: '730853325418922095',
	eventHandlers: {
		channelCreate: (chnl) =>
			console.log(
				`channel was created in ${
					chnl.guildID ? cache.guilds.get(chnl.guildID)?.name : 'N/A'
				} with the name of ${chnl.name} and the id of ${chnl.id}`
			),
	},
	imports: {
		cmdDir: './Tests/commands',
		monitorDir: './Tests/monitors',
	},
	prefix: 'test.',
	token: env.TOKEN,
	useMongoDB: true,
});
