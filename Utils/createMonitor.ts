import { monitors } from '../Storage/monitors.ts';
import type { monitor } from '../Types/monitor.ts';

export default function createMonitor(monitor: monitor) {
	monitors.push(monitor);
}
