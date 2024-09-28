'use client';

import { Provider, useSelector } from 'react-redux';
import './global.css';

import { AssetsWidget } from './widgets/AssetsWIdget';
import { ChartsWidget } from './widgets/ChartsWidget';
import { store } from '@/config/store';
import { useEffect } from 'react';
import { usePostPortfolioMutation } from '@/config/api/tInvestApi';
import { Preloader } from './components/Preloader/Preloader';

const InnerPage = () => {
	const [getPortfolio, { data: portfolioData, isLoading: isPortfolioLoading }] =
		usePostPortfolioMutation();

	const isLoading = isPortfolioLoading;
	const hasNoData = !portfolioData;

	useEffect(() => {
		getPortfolio();
	}, []);

	if (isLoading) {
		return <Preloader />;
	}

	if (hasNoData) {
		return <Preloader />;
	}

	return (
		<main>
			<h1>Dashboard</h1>
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
