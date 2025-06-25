import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();

	const texts = {
		copy: t("copy"),
	};

	return { texts };
};
