import { IPosition, TPortfolioResponse } from '../types';

export const getFloatCost = (int: string, nano: number) =>
	Number(int) + nano / 1000000000;

export const getAssetData = (assetId: string, response: TPortfolioResponse) => {
	const etf = response.positions.find(
		(value) => assetId === value.instrumentUid
	) as IPosition;

	return {
		priceInt: etf.currentPrice.units,
		priceNano: etf.currentPrice.nano,
		units: etf.quantity.units,
	};
};

export const getRandomInteger = () => Math.floor(Math.random() * 100);
export const getRandomBigInteger = () =>
	Math.floor(Math.random() * 10000000000);
