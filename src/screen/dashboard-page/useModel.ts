import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();

	const texts = {
		dashboard: t("dashboard"),
	};

	return {
		texts,
	};
};
