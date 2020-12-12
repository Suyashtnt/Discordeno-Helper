import { createMonitor } from '../../mod.ts';

export default createMonitor({
	desc: 'logs command',
	runs: (msg) => {
		console.log(msg.content);
		if (msg.content === 'ea sports') {
			msg.return('its in the game');
		}
	},
});
