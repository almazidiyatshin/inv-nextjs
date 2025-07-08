import { useTranslations } from "next-intl";
import { useTInvestApi } from "shared/api";

export const useModel = () => {
	const t = useTranslations();
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
