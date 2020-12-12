import { sendMessage } from 'https://x.nest.land/Discordeno@9.4.0/mod.ts';
import type { inhibitor as inhib } from '../Types/inhibitor.ts';
const inhibitor: inhib = {
	desc: 'dm only inhibitor',
	runs: (cmd, msg) => {
		if (!msg.guildID) {
			return true;
		} else {
			sendMessage(
				msg.channelID,
				`\`${cmd.command}\` is a DM only command. Message me to run it`
			);
			return false;
		}
	},
};

export default inhibitor;
