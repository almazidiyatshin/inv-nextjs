import { TPostCandlesParams } from '@/config/api/types';
import { getDateRange } from '@/config/api/utils/getDateRange';
import { candleIntervals } from '@/constants/common';
import { useEffect } from 'react';

export const useGetCandleData = (
	filters: Pick<TPostCandlesParams, 'interval'>,
	fetchCandles: any
) => {
	const [getCandles, { data, isLoading }] = fetchCandles();
	const { from, to } = getDateRange(filters.interval);

	useEffect(() => {
		if (filters.interval) {
			getCandles({
				from,
				to,
				interval:
					filters.interval === candleIntervals.YEAR
						? candleIntervals.MONTH
						: filters.interval,
			});
		}
	}, [filters.interval]);

	return { data, isLoading };
};
