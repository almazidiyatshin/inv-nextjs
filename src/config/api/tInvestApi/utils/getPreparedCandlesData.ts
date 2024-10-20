import { ICandlesResponse } from '../types';
import { getFloatCost } from './common';

const monthes = {
	1: 'January',
	2: 'February',
	3: 'March',
	4: 'April',
	5: 'May',
	6: 'June',
	7: 'July',
	8: 'August',
	9: 'September',
	10: 'October',
	11: 'November',
	12: 'December',
};

type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const getPreparedCandlesData = (
	response: ICandlesResponse,
	interval: string
) => {
	const [candleFrom] = response.candles;

	const lastPrice = getFloatCost(candleFrom.close.units, candleFrom.close.nano);

	const lastPrices = response.candles.reduce<{ [key: string]: number }>(
		(acc, candle) => {
			if (interval === 'CANDLE_INTERVAL_WEEK') {
				const date = new Date(candle.time).toLocaleDateString();

				acc[date] = getFloatCost(candle.close.units, candle.close.nano);
			} else {
				const monthNumber = (new Date(candle.time).getMonth() +
					1) as MonthNumber;
				const monthName = monthes[monthNumber];

				acc[monthName] = getFloatCost(candle.close.units, candle.close.nano);
			}

			return acc;
		},
		{}
	);

	return { lastPrice, lastPrices };
};
