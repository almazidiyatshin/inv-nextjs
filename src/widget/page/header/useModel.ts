"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export const useModel = () => {
	const t = useTranslations();
	const pathname = usePathname();

	const texts = {
		title: t("investly"),
		dashboard: t("dashboard"),
		portfolioManagement: t("portfolioManagement"),
	};

	return { texts, currentPath: pathname.split("/")[2] };
};
