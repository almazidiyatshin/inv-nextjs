import { useTranslations } from "next-intl";
import { usePathname } from "shared/lib";

export const useModel = () => {
	const t = useTranslations();
	const pathname = usePathname();

	const texts = {
		title: t("investly"),
		dashboard: t("dashboard"),
		portfolioManagement: t("portfolioManagement"),
	};

	return { texts, currentPath: pathname };
};
