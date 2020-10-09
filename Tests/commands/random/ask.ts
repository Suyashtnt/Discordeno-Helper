import { createCommand } from '../../../mod.ts';
import { sendMessage } from 'https://x.nest.land/Discordeno@9.0.1/src/handlers/channel.ts';
import dmOnly from '../../../inhibitors/dmOnly.ts';
export default createCommand({
	command: 'ask',
	desc: 'ask something',
	runs: (msg) => {
		if (Math.random() > 0.5) {
			return msg.reply('yes');
		} else {
			return msg.return('no');
		}
	},
	customPrefix: 'something.',
	inhibitors: [dmOnly],
});
