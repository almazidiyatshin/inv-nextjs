import { useEffect } from "react";
import {
	useGetIndicatorsQuery,
	useGetMoexIndexQuery,
	usePostPortfolioMutation,
} from "shared/api";
import { useTranslation } from "shared/lib";
import type { TDashboardPageProps } from "./types";

export const useModel = ({ locale }: TDashboardPageProps) => {
	const [getPortfolio, { data: portfolioData, isLoading: isPortfolioLoading }] =
		usePostPortfolioMutation();
	const { data: indicatorsData, isLoading: isIndicatorsLoading } =
		useGetIndicatorsQuery();
	const { data: moexIndex, isLoading: isMoexIndexLoading } =
		useGetMoexIndexQuery();

	const t = useTranslation(locale);

	const isLoading =
		isPortfolioLoading || isIndicatorsLoading || isMoexIndexLoading;

	useEffect(() => {
		getPortfolio();
	}, [getPortfolio]);

	return {
		isLoading,
		portfolioData,
		indicatorsData,
		moexIndex,
		t,
	};
};
