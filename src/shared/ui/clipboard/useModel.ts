import { useTranslations } from "next-intl";

export const useModel = () => {
	const t = useTranslations();

	const texts = {
		copy: t("copy"),
	};

	return { texts };
};
