import type { IPosition, TPortfolioResponse } from "../types";

export const getFloatCost = (int: number, nano: number) =>
	int + nano / 1000000000;

export const getAssetData = (assetId: string, response: TPortfolioResponse) => {
	return response.reduce(
		(acc, portfolio) => {
			const etf = portfolio.positions.find(
				(value) => assetId === value.instrumentUid,
			) as IPosition;

			if (!etf) {
				return acc;
			}

			return {
				priceInt: Number(etf.currentPrice.units),
				priceNano: etf.currentPrice.nano,
				units: acc.units + Number(etf.quantity.units),
			};
		},
		{
			priceInt: 0,
			priceNano: 0,
			units: 0,
		},
	);
};

export const getRandomInteger = () => Math.floor(Math.random() * 100);
export const getRandomBigInteger = () =>
	Math.floor(Math.random() * 10000000000);
