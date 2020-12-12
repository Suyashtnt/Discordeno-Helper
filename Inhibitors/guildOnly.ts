import { sendMessage } from 'https://x.nest.land/Discordeno@9.4.0/mod.ts';
import type { inhibitor as inhib } from '../Types/inhibitor.ts';
const inhibitor: inhib = {
	desc: 'guild only inhibitor',
	runs: (cmd, msg) => {
		if (msg.guildID) {
			return true;
		} else {
			sendMessage(
				msg.channelID,
				`\`${cmd.command}\` is an server only command. Run it in a server`
			);
			return false;
		}
	},
};

export default inhibitor;
