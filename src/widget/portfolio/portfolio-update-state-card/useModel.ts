"use client";

import { useTranslations } from "next-intl";
import { useCommonApi } from "shared/api";

export const useModel = () => {
	const t = useTranslations();
	const { data, isLoading, isFetching } = useCommonApi.getAssets();

	const texts = {
		title: t("updatePortfolioState"),
		noAssets: t("noAssets"),
		createAssets: t("noAssetsDescription"),
	};

	return {
		texts,
		data: data || {},
		isActive: !!Object.keys(data || {}).length,
		isLoading: isLoading || isFetching,
	};
};
