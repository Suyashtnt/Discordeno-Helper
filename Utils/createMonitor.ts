import { monitors } from '../Storage/monitors.ts';
import { monitor } from '../Types/monitor.ts';

export const createMonitor = (monitor: monitor) => {
	monitors.push(monitor);
};
