"use client";

import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();

	const texts = {
		portfolioManagement: t("portfolioManagement"),
	};

	return {
		texts,
	};
};
