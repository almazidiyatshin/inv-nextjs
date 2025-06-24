import { useTranslation } from "shared/lib";
import type { THeaderProps } from "./types";

export const useModel = ({ locale }: THeaderProps) => {
	const t = useTranslation(locale);

	return { title: t("investly") };
};
