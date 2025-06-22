import { useEffect } from "react";
import { useCommonApi, useTInvestApi } from "shared/api";
import { useTranslation } from "shared/lib";
import type { TDashboardPageProps } from "./types";

export const useModel = ({ locale }: TDashboardPageProps) => {
	const [
		portfolioRequest,
		{ data: portfolioData, isLoading: isPortfolioLoading },
	] = useTInvestApi.postPortfolio();
	const { data: indicatorsData, isLoading: isIndicatorsLoading } =
		useCommonApi.getIndicators();
	const { data: moexIndex, isLoading: isMoexIndexLoading } =
		useCommonApi.getMoexIndex();

	const t = useTranslation(locale);

	const isLoading =
		isPortfolioLoading || isIndicatorsLoading || isMoexIndexLoading;

	useEffect(() => {
		portfolioRequest();
	}, [portfolioRequest]);

	return {
		isLoading,
		portfolioData,
		indicatorsData,
		moexIndex,
		t,
	};
};
