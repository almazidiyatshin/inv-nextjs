"use client";

import { usePathname } from "next/navigation";
import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();
	const pathname = usePathname();

	const texts = {
		title: t("investly"),
		dashboard: t("dashboard"),
		portfolioManagement: t("portfolioManagement"),
	};

	return { texts, currentPath: pathname.split("/")[2] };
};
