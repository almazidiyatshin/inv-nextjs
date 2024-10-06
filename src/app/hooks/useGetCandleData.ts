import { TPostCandlesParams } from '@/config/api';
import { getDateRange } from '@/config/api';
import { candleIntervals } from '@/constants/common';
import { useEffect } from 'react';

const getInterval = (interval: string) => {
	return interval === candleIntervals.YEAR ? candleIntervals.MONTH : interval;
};

export const useGetCandleData = (
	filters: Pick<TPostCandlesParams, 'interval'>,
	// TODO fix any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fetchCandles: { id: string; fetch: any }[]
): { data: { id: string; data: number }[]; isLoading: boolean } => {
	const { from, to } = getDateRange(filters.interval);
	const results = fetchCandles.map(({ id, fetch }) => ({ id, value: fetch() }));
	const isLoading = results.some(({ value: [, { isLoading }] }) => isLoading);

	useEffect(() => {
		if (filters.interval) {
			results.forEach(({ value: [fetch] }) => {
				fetch({ from, to, interval: getInterval(filters.interval) });
			});
		}
		// eslint-disable-next-line
	}, [filters.interval]);

	return {
		data: results.map(({ id, value: [, { data }] }) => ({ id, data })),
		isLoading,
	};
};
