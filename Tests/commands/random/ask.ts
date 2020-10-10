import { createCommand } from '../../../mod.ts';
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
	category: 'random',
});
