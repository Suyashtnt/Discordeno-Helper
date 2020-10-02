import { inhibitor } from '../../Types/inhibitor.ts';

const inhibitor: inhibitor = {
	desc: 'logs command',
	runs: (cmd) => {
		console.log(cmd);
		return true;
	},
};

export default inhibitor;
