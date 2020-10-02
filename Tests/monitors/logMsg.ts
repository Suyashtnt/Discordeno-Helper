import { createMonitor } from '../../Utils/createMonitor.ts';

export default createMonitor({
	desc: 'logs command',
	runs: (msg) => {
		console.log('this is running');

		console.log(msg.content);
	},
});
