"use client";

import { useCommonApi } from "shared/api";
import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();
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
