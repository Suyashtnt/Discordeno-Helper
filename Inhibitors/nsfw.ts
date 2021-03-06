import {
	cache,
	sendMessage,
} from 'https://x.nest.land/Discordeno@9.4.0/mod.ts';
import type { inhibitor as inhib } from '../Types/inhibitor.ts';
const inhibitor: inhib = {
	desc: 'nsfw inhibitor',
	runs: (cmd, msg) => {
		if (cache.channels.get(msg.channelID)?.nsfw) {
			return true;
		} else {
			sendMessage(
				msg.channelID,
				`\`${cmd.command}\` is a NSFW command. Run it in an NSFW channel`
			);
			return false;
		}
	},
};

export default inhibitor;
