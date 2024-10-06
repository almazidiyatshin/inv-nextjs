'use client';

import { Preloader } from '@/app/components/Preloader';
import { usePostPortfolioMutation } from '@/config/api';
import { useEffect } from 'react';
import { AssetsWidget } from '../AssetsWIdget';
import { ChartsWidget } from '../ChartsWidget';
import { Provider } from 'react-redux';
import { store } from '@/config/store';

export const WidgetsInner = () => {
	const [getPortfolio, { data: portfolioData, isLoading: isPortfolioLoading }] =
		usePostPortfolioMutation();

	const isLoading = isPortfolioLoading;
	const hasNoData = !portfolioData;

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
			<AssetsWidget data={portfolioData} />
			<ChartsWidget data={portfolioData} />
		</>
	);
};

export const Widgets = () => (
	<Provider store={store}>
		<WidgetsInner />
	</Provider>
);
