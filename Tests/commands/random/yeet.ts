import { createCommand } from '../../../mod.ts';
import { sendMessage } from 'https://x.nest.land/Discordeno@9.4.0/src/handlers/channel.ts';
import log from '../../inhibitors/log.ts';
export default createCommand({
	command: 'yeet',
	desc: 'YEET!',
	args: ['[person to YEET]'],
	aliases: ['y', 'goaway'],
	runs: (msg, args) => {
		if (args != null && args[0] != undefined)
			sendMessage(msg.channelID, `yeeted ${args[0]}`);
		else sendMessage(msg.channelID, 'please enter a person to yeet');
	},
	//inhibitors: [log],
	userPerms: ['KICK_MEMBERS'],
	botPerms: ['KICK_MEMBERS'],
	cooldown: 7000,
	category: 'random',
});
