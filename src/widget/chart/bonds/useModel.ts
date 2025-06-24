import { useTInvestApi } from "shared/api";
import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();
	const { data, isLoading } = useTInvestApi.postPortfolio();

	const { tbruSum = 0, allBondsSum = 0, tlcbSum = 0, tofzSum = 0 } = data || {};

	const tbruPercent = (tbruSum / allBondsSum) * 100;
	const tlcbPercent = (tlcbSum / allBondsSum) * 100;
	const tofzPercent = (tofzSum / allBondsSum) * 100;

	const dataSet = [
		{ name: "TBRU", value: tbruPercent, color: "teal.500" },
		{ name: "TLCB", value: tlcbPercent, color: "teal.400" },
		{ name: "TOFZ", value: tofzPercent, color: "teal.300" },
	];

	return { title: t("allBondsStatistics"), dataSet, isLoading };
};
