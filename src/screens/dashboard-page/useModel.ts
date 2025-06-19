import { useEffect } from 'react';
import {
	usePostPortfolioMutation,
	useGetIndicatorsQuery,
	useGetMoexIndexQuery,
} from 'shared/api';
import { TDashboardPageProps } from './types';
import { useTranslation } from 'shared/lib';

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
