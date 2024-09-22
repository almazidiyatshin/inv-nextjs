import { getFloatCost } from '../config/api/utils/common';

export const getAssetData = async ({ dateFrom, dateTo, instrumentId }) => {
	const request = await import('../app/api/asset/route');
	const response = await (
		await request.POST({ dateFrom, dateTo, instrumentId })
	).json();

	const [candleFrom, candleTo] = response.candles;

	const priceLastMonth = getFloatCost(
		candleFrom.close.units,
		candleFrom.close.nano
	);

	return priceLastMonth;
};
