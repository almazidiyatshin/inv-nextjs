import { ICandlesResponse } from '../types';
import { getFloatCost } from './common';

export const getPreparedCandlesData = (response: ICandlesResponse) => {
	const [candleFrom] = response.candles;

	const lastPrice = getFloatCost(candleFrom.close.units, candleFrom.close.nano);

	return lastPrice;
};
