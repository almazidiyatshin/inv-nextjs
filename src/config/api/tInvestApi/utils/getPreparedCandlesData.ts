import { ICandlesResponse } from '../types';
import { getFloatCost } from './common';

export const getPreparedCandlesData = (response: ICandlesResponse) => {
	const [earliestCandle] = response.candles;

	const lastPrice = getFloatCost(
		earliestCandle.close.units,
		earliestCandle.close.nano
	);

	const lastPrices = response.candles.reduce<{ [key: string]: number }>(
		(acc, candle) => {
			const date = String(new Date(candle.time).valueOf());
			acc[date] = getFloatCost(candle.close.units, candle.close.nano);
			return acc;
		},
		{}
	);

	return {
		lastPrice,
		lastPrices,
	};
};
