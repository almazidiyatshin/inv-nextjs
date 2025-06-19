import { useEffect } from 'react';
import {
	TPostCandlesApiParams,
	TPostCandlesApiReturn,
} from 'shared/api/tInvest-api/types';
import { getDateRange } from 'shared/api/tInvest-api/utils/getDateRange';
import { ECandleInterval } from 'shared/constants';

const getLimit = (interval: ECandleInterval) => {
	const limitsMap = {
		[ECandleInterval.YEAR]: 12,
		[ECandleInterval.FIVE_YEARS]: 60,
		[ECandleInterval.TEN_YEARS]: 120,
	};
	return limitsMap[interval];
};

export const useGetCandleData = (
	filters: Pick<TPostCandlesApiParams, 'interval'>,
	// TODO fix any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fetchCandles: { id: string; fetch: any }[]
): {
	data: { id: string; data: TPostCandlesApiReturn }[];
	isLoading: boolean;
} => {
	const { from, to } = getDateRange(filters.interval);
	const results = fetchCandles.map(({ id, fetch }) => ({ id, value: fetch() }));
	const isLoading = results.some(({ value: [, { isLoading }] }) => isLoading);

	useEffect(() => {
		if (filters.interval) {
			results.forEach(({ id, value: [fetch] }) => {
				fetch({
					from,
					to,
					interval: 'CANDLE_INTERVAL_MONTH',
					limit: getLimit(filters.interval),
					instrumentId: id,
				});
			});
		}
		// eslint-disable-next-line
	}, [filters.interval]);

	return {
		data: results.map(({ id, value: [, { data }] }) => ({ id, data })),
		isLoading,
	};
};
