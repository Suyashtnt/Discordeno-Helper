interface Mapping {
	[key: string]: number;
}

const DURATION_MAPPING: Mapping = {
	years: 60 * 60 * 24 * 365,
	weeks: 60 * 60 * 24 * 7,
	days: 60 * 60 * 24,
	hours: 60 * 60,
	minutes: 60,
	seconds: 1,
};

/**
 * Turn a delta into a human readanble thing
 * @param delta the delta
 */
export function humanizeDelta(delta: number) {
	let d = delta;
	// deno-lint-ignore no-explicit-any
	const durations: any[] = [];

	Object.entries(DURATION_MAPPING).forEach(([durationKey, duration]) => {
		if (duration <= d) {
			duration *= 1000;
			const count: number = Math.floor(d / duration);

			d -= duration * count;
			if (count) {
				durations.push([durationKey, count]);
			}
		}
	});

	return durations.map(([name, count]) => `${count} ${name}`).join(' ');
}

export function stringToSeconds(amount: string) {
	if (!amount) {
		return 0;
	}
	const value = (amount.match(/\d+/) || [])[0];
	const key = (amount.match(/[a-z]/) || [])[0];

	if (!value || !key) {
		return 0;
	}

	if (DURATION_MAPPING[key]) {
		return parseInt(value) * DURATION_MAPPING[key];
	}
	return 0;
}
