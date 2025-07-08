import { useTranslations } from "next-intl";

export const useModel = () => {
	const t = useTranslations();

	return { demoUserName: t("demoUser"), demoModeLabel: t("demoMode") };
};
