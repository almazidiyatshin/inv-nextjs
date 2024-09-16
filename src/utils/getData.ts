import { IPortfolioResponse } from '@/types/tInvest';
import { getEtfData, getFloatCost } from './tInvest';
import { etfIds } from '@/constants/common';
import { TEtfData } from '@/types/common';

const calculateTotal = (etfId: string, etfData: { [id: string]: TEtfData }) => {
	const { priceInt, priceNano, units } = etfData[etfId];
	return getFloatCost(priceInt, priceNano) * Number(units);
};

export const getData = async () => {
	const request = await import('../app/api/list/route');
	const response: IPortfolioResponse = await (await request.POST()).json();

	const etfData = Object.entries(etfIds).reduce<{ [id: string]: TEtfData }>(
		(acc, [, id]) => {
			const { priceInt, priceNano, units } = getEtfData(id, response);
			acc[id] = { priceInt, priceNano, units };
			return acc;
		},
		{}
	);

	const totalTRosTechSum = calculateTotal(etfIds.T_ROS_TECH, etfData);
	const totalTiMoexSum = calculateTotal(etfIds.T_IMOEX, etfData);
	const totalTBondsSum = calculateTotal(etfIds.T_BONDS, etfData);
	const totalTLocalBondsSum = calculateTotal(etfIds.T_LOCAL_BONDS, etfData);

	const totalOherShares = getFloatCost(
		response.totalAmountShares.units,
		response.totalAmountShares.nano
	);

	const totalAllSharesSum = totalOherShares + totalTiMoexSum + totalTRosTechSum;
	const totalBondsSum = totalTBondsSum + totalTLocalBondsSum;
	const totalGoldSum = calculateTotal(etfIds.T_GOLD, etfData);

	return {
		allSharesSum: totalAllSharesSum,
		bondsSum: totalBondsSum,
		goldSum: totalGoldSum,
		totalSum: totalAllSharesSum + totalBondsSum + totalGoldSum,
		tBondsSum: totalTBondsSum,
		tLocalBondsSum: totalTLocalBondsSum,
		tIMOEXSum: totalTiMoexSum,
		tRosTechSum: totalTRosTechSum,
		otherSharesSum: totalOherShares,
	};
};
