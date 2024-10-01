'use client';

import { Provider } from 'react-redux';
import './global.css';

import { AssetsWidget } from './widgets/AssetsWIdget';
import { ChartsWidget } from './widgets/ChartsWidget';
import { store } from '@/config/store';
import { useEffect } from 'react';
import { usePostPortfolioMutation } from '@/config/api';
import { Preloader } from './components/Preloader/Preloader';
import { useGetIndicatorsQuery } from '@/config/api/cbApi/cbApi';
import { Header } from './components/Header';

const InnerPage = () => {
	const [getPortfolio, { data: portfolioData, isLoading: isPortfolioLoading }] =
		usePostPortfolioMutation();
	const { data: indicators, isLoading: isIndicatorsLoading } =
		useGetIndicatorsQuery();

	const isLoading = isPortfolioLoading || isIndicatorsLoading;
	const hasNoData = !portfolioData || !indicators;

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
		<main>
			<Header indicators={indicators} />
			<AssetsWidget data={portfolioData} />
			<ChartsWidget data={portfolioData} />
		</main>
	);
};

export default function Page() {
	return (
		<Provider store={store}>
			<InnerPage />
		</Provider>
	);
}
