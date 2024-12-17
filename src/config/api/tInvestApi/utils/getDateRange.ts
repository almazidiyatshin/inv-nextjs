import { candleIntervals } from '@/constants/common';

export const getDateRange = (interval: string) => {
	let from;
	let to;

	const today = new Date();
	const formatDateToISO = (date: Date): string => date.toISOString();

	switch (interval) {
		case candleIntervals.MONTH:
			const lastMonth = new Date();
			lastMonth.setMonth(today.getMonth() - 2);
			to = formatDateToISO(today);
			from = formatDateToISO(lastMonth);
			break;

		case candleIntervals.WEEK:
			const lastWeek = new Date();
			lastWeek.setDate(today.getDate() - 9);
			to = formatDateToISO(today);
			from = formatDateToISO(lastWeek);
			break;

		case candleIntervals.YEAR:
			const lastYear = new Date();
			lastYear.setFullYear(today.getFullYear() - 1);
			to = formatDateToISO(today);
			from = formatDateToISO(lastYear);
			break;

		default:
			throw new Error(`Unknown interval: ${interval}`);
	}

	return { from, to };
};
