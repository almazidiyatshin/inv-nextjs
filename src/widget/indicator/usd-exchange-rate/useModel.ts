import { useTranslations } from "next-intl";
import { useCommonApi } from "shared/api";
import { toRub } from "shared/utils";

export const useModel = () => {
	const t = useTranslations();
	const { data, isLoading } = useCommonApi.getUsdExchangeRate();

	const value = toRub(Number((data || "0").replace(",", ".")), 2);

	return { title: t("usdExchangeRate"), value, isLoading };
};
