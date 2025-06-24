import { useTranslation } from "shared/lib";
import type { TDashboardPageProps } from "./types";

export const useModel = ({ locale }: TDashboardPageProps) => {
	const t = useTranslation(locale);

	return {
		t,
	};
};
