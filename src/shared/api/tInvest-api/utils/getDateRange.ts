import { ECandleInterval } from 'shared/constants';

export const getDateRange = (interval: string) => {
	let from;
	let to;

	const today = new Date();
	const formatDateToISO = (date: Date): string => date.toISOString();

	switch (interval) {
		case ECandleInterval.YEAR: {
			const lastYear = new Date();
			lastYear.setFullYear(today.getFullYear() - 1);
			to = formatDateToISO(today);
			from = formatDateToISO(lastYear);
			break;
		}

		case ECandleInterval.FIVE_YEARS: {
			const fiveYearsAgo = new Date();
			fiveYearsAgo.setFullYear(today.getFullYear() - 5);
			to = formatDateToISO(today);
			from = formatDateToISO(fiveYearsAgo);
			break;
		}

		case ECandleInterval.TEN_YEARS: {
			const tenYearsAgo = new Date();
			tenYearsAgo.setFullYear(today.getFullYear() - 10);
			to = formatDateToISO(today);
			from = formatDateToISO(tenYearsAgo);
			break;
		}

		default: {
			throw new Error(`Unknown interval: ${interval}`);
		}
	}

	return { from, to };
};
