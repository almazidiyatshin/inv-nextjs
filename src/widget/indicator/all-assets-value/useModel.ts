import { useTInvestApi } from "shared/api";
import { useTranslation } from "shared/lib";
import { toRub } from "shared/utils";

export const useModel = () => {
	const t = useTranslation();
	const { data, isLoading } = useTInvestApi.postPortfolio();

	const { totalSum = 0 } = data || {};

	const value = toRub(Number(totalSum.toFixed(0)));

	return { title: t("allAssetsValue"), value, isLoading };
};
