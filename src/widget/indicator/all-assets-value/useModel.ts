import { useTInvestApi } from "shared/api";
import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();
	const { data, isLoading } = useTInvestApi.postPortfolio();

	return { title: t("allAssetsValue"), value: data?.totalSum, isLoading };
};
