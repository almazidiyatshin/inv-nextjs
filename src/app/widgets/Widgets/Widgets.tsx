'use client';

import { Preloader } from '@/app/components/Preloader';
import { useEffect } from 'react';
import { AssetsWidget } from '../AssetsWIdget';
import { ChartsWidget } from '../ChartsWidget';
import { Provider } from 'react-redux';
import { usePostPortfolioMutation } from '@/config/api';
import { store } from '@/config/store';
import { LS_LOCALE_KEY } from '@/constants/common';
import { TLocale } from '@/app/hooks/useTranslation';
import {
	useGetIndicatorsQuery,
	useGetMoexIndexQuery,
} from '@/config/api/commonApi/commonApi';
import { IndicatorsWidget } from '../IndicatorsWidget';

type TProps = {
	locale: TLocale;
};

export const WidgetsInner = () => {
	const [getPortfolio, { data: portfolioData, isLoading: isPortfolioLoading }] =
		usePostPortfolioMutation();
	const { data: indicatorsData, isLoading: isIndicatorsLoading } =
		useGetIndicatorsQuery();
	const { data: moexIndex, isLoading: isMoexIndexLoading } =
		useGetMoexIndexQuery();

	const isLoading =
		isPortfolioLoading || isIndicatorsLoading || isMoexIndexLoading;
	const hasNoData = !portfolioData || !indicatorsData || !moexIndex;

	useEffect(() => {
		getPortfolio();
	}, [getPortfolio]);

	if (isLoading) {
		return <Preloader />;
	}

	if (hasNoData) {
		return <Preloader />;
	}

	return (
		<>
			<IndicatorsWidget
				portfolioData={portfolioData}
				indicatorsData={indicatorsData}
				moexIndex={moexIndex}
			/>
			<AssetsWidget data={portfolioData} />
			<ChartsWidget data={portfolioData} />
		</>
	);
};

export const Widgets = ({ locale }: TProps) => {
	useEffect(() => {
		localStorage.setItem(LS_LOCALE_KEY, locale);
	}, [locale]);

	return (
		<Provider store={store}>
			<WidgetsInner />
		</Provider>
	);
};
