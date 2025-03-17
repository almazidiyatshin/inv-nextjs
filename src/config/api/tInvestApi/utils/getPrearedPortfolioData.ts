import { getAssetData, getFloatCost } from './common';
import { etfIds, sharesIds } from '@/constants/common';
import { TAssetData } from '@/types/common';
import { TPortfolioResponse } from '../types';

const calculateTotal = (
	etfId: string,
	etfData: { [id: string]: TAssetData }
) => {
	const { priceInt, priceNano, units } = etfData[etfId];
	return getFloatCost(priceInt, priceNano) * Number(units);
};

export const getPreparedPortfolioData = (response: TPortfolioResponse) => {
	const etfData = Object.entries(etfIds).reduce<{ [id: string]: TAssetData }>(
		(acc, [, id]) => {
			const { priceInt, priceNano, units } = getAssetData(id, response);
			acc[id] = { priceInt, priceNano, units };
			return acc;
		},
		{}
	);
	const sharesData = Object.entries(sharesIds).reduce<{
		[id: string]: TAssetData;
	}>((acc, [, id]) => {
		const { priceInt, priceNano, units } = getAssetData(id, response);
		acc[id] = { priceInt, priceNano, units };
		return acc;
	}, {});

	const titrSum = calculateTotal(etfIds.TITR, etfData);
	const tmosSum = calculateTotal(etfIds.TMOS, etfData);
	const tbruSum = calculateTotal(etfIds.TBRU, etfData);
	const tlcbSum = calculateTotal(etfIds.TLCB, etfData);
	const tofzSum = calculateTotal(etfIds.TOFZ, etfData);
	const lqdtSum = calculateTotal(etfIds.LQDT, etfData);

	const otherSharesSum = getFloatCost(
		response.totalAmountShares.units,
		response.totalAmountShares.nano
	);

	const allSharesSum = otherSharesSum + tmosSum + titrSum;
	const allBondsSum = tbruSum + tlcbSum + tofzSum + lqdtSum;
	const goldSum = calculateTotal(etfIds.TGLD, etfData);

	const expectedYield = getFloatCost(
		response.expectedYield.units,
		response.expectedYield.nano
	);

	return {
		allSharesSum,
		allBondsSum,
		goldSum,
		totalSum: allSharesSum + allBondsSum + goldSum,
		tbruSum,
		tlcbSum,
		tofzSum,
		lqdtSum,
		tmosSum,
		titrSum,
		otherSharesSum,
		tgldCount: etfData[etfIds.TGLD].units,
		tbruCount: etfData[etfIds.TBRU].units,
		tlcbCount: etfData[etfIds.TLCB].units,
		tofzCount: etfData[etfIds.TOFZ].units,
		tmosCount: etfData[etfIds.TMOS].units,
		titrCount: etfData[etfIds.TITR].units,
		lqdtCount: etfData[etfIds.LQDT].units,
		beluCount: sharesData[sharesIds.BELU].units,
		chmfCount: sharesData[sharesIds.CHMF].units,
		magnCount: sharesData[sharesIds.MAGN].units,
		mgntCount: sharesData[sharesIds.MGNT].units,
		nlmkCount: sharesData[sharesIds.NLMK].units,
		expectedYield: expectedYield,
	};
};
