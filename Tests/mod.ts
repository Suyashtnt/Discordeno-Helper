import { connect, startup } from '../mod.ts';
import { config } from '../deps.ts';
import { importDirectory } from '../Utils/ImportFromDir.ts';
import { cache } from 'https://x.nest.land/Discordeno@9.0.1/src/utils/cache.ts';

importDirectory(Deno.realPathSync('./Tests/commands/'));
importDirectory(Deno.realPathSync('./Tests/inhibitors/'));
importDirectory(Deno.realPathSync('./Tests/monitors/'));
const env = config();
connect(env.MONGOURL);

startup(env.TOKEN, 'test.', '730853325418922095', true, {
	channelCreate: (chnl) =>
		console.log(
			`channel was created in ${
				chnl.guildID ? cache.guilds.get(chnl.guildID)?.name : 'N/A'
			} with the name of ${chnl.name} and the id of ${chnl.id}`
		),
});
