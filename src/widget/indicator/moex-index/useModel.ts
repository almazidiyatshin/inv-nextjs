import { useCommonApi } from "shared/api";
import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();
	const { data, isLoading } = useCommonApi.getMoexIndex();

	return { title: t("moexIndex"), value: data, isLoading };
};
