"use client";

import { useTranslations } from "next-intl";

export const useModel = () => {
	const t = useTranslations();

	const texts = {
		title: t("addNewPortfolio"),
	};

	return { texts };
};
