import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();

	return { demoUserName: t("demoUser"), demoModeLabel: t("demoMode") };
};
