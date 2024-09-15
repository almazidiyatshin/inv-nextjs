import { IPortfolioResponse, IPosition } from '@/types/tInvest';

export const getFloatCost = (int: string, nano: number) =>
	Number(int) + nano / 1000000000;

export const getEtfData = (etfId: string, response: IPortfolioResponse) => {
	const etf = response.positions.find(
		(value) => etfId === value.instrumentUid
	) as IPosition;

	return {
		priceInt: etf.currentPrice.units,
		priceNano: etf.currentPrice.nano,
		units: etf.quantity.units,
	};
};
