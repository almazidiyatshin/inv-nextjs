import { useEffect } from "react";
import type {
	TPostCandlesApiParams,
	TPostCandlesApiReturn,
} from "shared/api/t-invest-api/types";
import { getDateRange } from "shared/api/t-invest-api/utils/getDateRange";
import { ECandleInterval } from "shared/constants";

const getLimit = (interval: ECandleInterval) => {
	const limitsMap = {
		[ECandleInterval.YEAR]: 12,
		[ECandleInterval.FIVE_YEARS]: 60,
		[ECandleInterval.TEN_YEARS]: 120,
	};
	return limitsMap[interval];
};

export const useGetCandleData = (
	filters: Pick<TPostCandlesApiParams, "interval">,
	fetchCandles: { id: string; fetch: any }[],
): {
	data: { id: string; data: TPostCandlesApiReturn }[];
	isLoading: boolean;
} => {
	const { from, to } = getDateRange(filters.interval);
	const results = fetchCandles.map(({ id, fetch }) => ({ id, value: fetch() }));
	const isLoading = results.some(({ value: [, { isLoading }] }) => isLoading);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <TODO fix>
	useEffect(() => {
		if (filters.interval) {
			results.forEach(({ id, value: [fetch] }) => {
				fetch({
					from,
					to,
					interval: "CANDLE_INTERVAL_MONTH",
					limit: getLimit(filters.interval),
					instrumentId: id,
				});
			});
		}
	}, [filters.interval]);

	return {
		data: results.map(({ id, value: [, { data }] }) => ({ id, data })),
		isLoading,
	};
};
