import { useCommonApi } from "shared/api";
import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();
	const { data, isLoading } = useCommonApi.getIndicators();

	return { title: t("keyRate"), value: data?.[1], isLoading };
};
