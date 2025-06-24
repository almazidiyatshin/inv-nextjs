import { useTInvestApi } from "shared/api";
import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();
	const { data, isLoading } = useTInvestApi.postPortfolio();

	const {
		allSharesSum = 0,
		allBondsSum = 0,
		totalSum = 0,
		goldSum = 0,
	} = data || {};

	const allSharesPercent = (allSharesSum / totalSum) * 100;
	const allBondsPercent = (allBondsSum / totalSum) * 100;
	const goldPercent = (goldSum / totalSum) * 100;

	const dataSet = [
		{ name: t("shares"), value: allSharesPercent, color: "teal.500" },
		{ name: t("bonds"), value: allBondsPercent, color: "teal.400" },
		{ name: t("gold"), value: goldPercent, color: "teal.300" },
	];

	return { title: t("allAssetsStatistics"), dataSet, isLoading };
};
