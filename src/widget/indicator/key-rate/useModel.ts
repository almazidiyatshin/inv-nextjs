import { useTranslations } from "next-intl";
import { useCommonApi } from "shared/api";

export const useModel = () => {
	const t = useTranslations();
	const { data, isLoading } = useCommonApi.getIndicators();

	return { title: t("keyRate"), value: data?.[1], isLoading };
};
