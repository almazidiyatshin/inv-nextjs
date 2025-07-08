import { useTranslations } from "next-intl";
import { useCommonApi } from "shared/api";

export const useModel = () => {
	const t = useTranslations();
	const { data, isLoading } = useCommonApi.getMoexIndex();

	return { title: t("moexIndex"), value: data, isLoading };
};
