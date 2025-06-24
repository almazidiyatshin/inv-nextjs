import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();

	return { title: t("investly") };
};
