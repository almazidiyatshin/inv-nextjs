import { translate } from '@/app/utils/localization';
import { ICandlesResponse } from '../types';
import { getFloatCost } from './common';

type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const getPreparedCandlesData = (
	response: ICandlesResponse,
	limit: number
) => {
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

	const [earliestCandle] = response.candles;

	const lastPrice = getFloatCost(
		earliestCandle.close.units,
		earliestCandle.close.nano
	);

	const lastPrices = response.candles.reduce<{ [key: string]: number }>(
		(acc, candle) => {
			const date = new Date(candle.time);
			const monthNumber = (date.getMonth() + 1) as MonthNumber;
			const monthName = monthes[monthNumber];
			const year = date.getFullYear();

			acc[limit > 12 ? `${monthName}, ${year}` : monthName] = getFloatCost(
				candle.close.units,
				candle.close.nano
			);

			return acc;
		},
		{}
	);

	return {
		lastPrice,
		lastPrices,
	};
};
