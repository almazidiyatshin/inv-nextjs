import { useTranslations } from "next-intl";

export const useModel = () => {
	const t = useTranslations();

	const texts = {
		dashboard: t("dashboard"),
	};

	return {
		texts,
	};
};
