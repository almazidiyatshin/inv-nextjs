import { useTranslations } from "next-intl";
import { useCommonApi } from "shared/api";

export const useModel = () => {
	const t = useTranslations();
	const { data, isLoading } = useCommonApi.getIndicators();

	return { title: t("inflationRate"), value: data?.[0], isLoading };
};
