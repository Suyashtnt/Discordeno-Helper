import { monitors } from '../Storage/monitors.ts';
import type { monitor } from '../Types/monitor.ts';

export const createMonitor = (monitor: monitor) => {
	monitors.push(monitor);
};
