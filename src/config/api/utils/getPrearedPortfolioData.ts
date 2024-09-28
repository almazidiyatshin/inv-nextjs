import { getEtfData, getFloatCost } from './common';
import { etfIds } from '@/constants/common';
import { TEtfData } from '@/types/common';
import { TPortfolioResponse } from '../types';

const calculateTotal = (etfId: string, etfData: { [id: string]: TEtfData }) => {
	const { priceInt, priceNano, units } = etfData[etfId];
	return getFloatCost(priceInt, priceNano) * Number(units);
};

export const getPreparedPortfolioData = (response: TPortfolioResponse) => {
	const etfData = Object.entries(etfIds).reduce<{ [id: string]: TEtfData }>(
		(acc, [, id]) => {
			const { priceInt, priceNano, units } = getEtfData(id, response);
			acc[id] = { priceInt, priceNano, units };
			return acc;
		},
		{}
	);

	const titrSum = calculateTotal(etfIds.TITR, etfData);
	const tmosSum = calculateTotal(etfIds.TMOS, etfData);
	const tbruSum = calculateTotal(etfIds.TBRU, etfData);
	const tlcbSum = calculateTotal(etfIds.TLCB, etfData);
	const tpaySum = calculateTotal(etfIds.TPAY, etfData);

	const otherSharesSum = getFloatCost(
		response.totalAmountShares.units,
		response.totalAmountShares.nano
	);

	const allSharesSum = otherSharesSum + tmosSum + titrSum;
	const allBondsSum = tbruSum + tlcbSum + tpaySum;
	const goldSum = calculateTotal(etfIds.TGLD, etfData);

	return {
		allSharesSum,
		allBondsSum,
		goldSum,
		totalSum: allSharesSum + allBondsSum + goldSum,
		tbruSum,
		tlcbSum,
		tpaySum,
		tmosSum,
		titrSum,
		otherSharesSum,
		tgldCount: etfData[etfIds.TGLD].units,
		tbruCount: etfData[etfIds.TBRU].units,
		tlcbCount: etfData[etfIds.TLCB].units,
		tpayCount: etfData[etfIds.TPAY].units,
		tmosCount: etfData[etfIds.TMOS].units,
		titrCount: etfData[etfIds.TITR].units,
	};
};
