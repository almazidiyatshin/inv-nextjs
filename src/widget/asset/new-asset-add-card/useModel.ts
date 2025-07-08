import { useTranslations } from "next-intl";
import { useCommonApi } from "shared/api";

export const useModel = () => {
	const t = useTranslations();
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
