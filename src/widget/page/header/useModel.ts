import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();

	const texts = {
		title: t("investly"),
		dashboard: t("dashboard"),
		portfolioManagement: t("portfolioManagement"),
	};

	return { texts };
};
