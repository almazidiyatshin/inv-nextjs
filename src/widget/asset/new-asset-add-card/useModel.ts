import { useCommonApi } from "shared/api";
import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();
	const { data, isLoading, isFetching } = useCommonApi.getPortfolios();

	const texts = {
		title: t("addNewAsset"),
		noPortfolios: t("noPortfolios"),
		createPortfolio: t("noPortfoliosDescription"),
	};

	return {
		texts,
		isActive: !!data?.length && !isLoading,
		isLoading: isLoading || isFetching,
	};
};
