import { translate } from '@/app/utils/localization';
import { ICandlesResponse } from '../types';
import { getFloatCost } from './common';

const monthes = {
	1: translate('january'),
	2: translate('february'),
	3: translate('march'),
	4: translate('april'),
	5: translate('may'),
	6: translate('june'),
	7: translate('july'),
	8: translate('august'),
	9: translate('september'),
	10: translate('october'),
	11: translate('november'),
	12: translate('december'),
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
