import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();

	const texts = {
		title: t("investly"),
		language: t("language"),
		darkMode: t("darkMode"),
		dashboard: t("dashboard"),
		portfolioManagement: t("portfolioManagement"),
	};

	return { texts };
};
