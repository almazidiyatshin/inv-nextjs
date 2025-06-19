import type { ICandlesResponse } from "../types";
import { getFloatCost } from "./common";

export const getPreparedCandlesData = (response: ICandlesResponse) => {
	const lastPrices = response.candles.reduce<{ [key: string]: number }>(
		(acc, candle) => {
			const date = String(new Date(candle.time).valueOf());
			acc[date] = getFloatCost(Number(candle.close.units), candle.close.nano);
			return acc;
		},
		{},
	);

	return {
		lastPrices,
	};
};
