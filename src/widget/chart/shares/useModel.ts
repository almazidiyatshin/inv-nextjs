import { useTranslations } from "next-intl";
import { useTInvestApi } from "shared/api";

export const useModel = () => {
	const t = useTranslations();
	const { data, isLoading } = useTInvestApi.postPortfolio();

	const { allSharesSum = 0, otherSharesSum = 0, tmosSum = 0 } = data || {};

	const otherSharesPercent = (otherSharesSum / allSharesSum) * 100;
	const tmosPercent = (tmosSum / allSharesSum) * 100;

	const dataSet = [
		{
			name: t("other"),
			value: otherSharesPercent,
			color: "teal.500",
		},
		{ name: "TMOS", value: tmosPercent, color: "teal.400" },
	];

	return { title: t("allSharesStatistics"), dataSet, isLoading };
};
