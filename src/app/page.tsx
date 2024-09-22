'use client';

import { Provider } from 'react-redux';
import './global.css';

import { AssetsWidget } from './widgets/AssetsWIdget';
import { ChartsWidget } from './widgets/ChartsWidget';
import { store } from '@/config/store';
import { useEffect } from 'react';
import { usePostPortfolioMutation } from '@/config/api/tInvestApi';
import { Preloader } from './components/Preloader/Preloader';

const InnerPage = () => {
	const [getPortfolio, { data, isLoading }] = usePostPortfolioMutation();

	useEffect(() => {
		getPortfolio();
	}, []);

	if (isLoading) {
		return <Preloader />;
	}

	if (!data) {
		return <Preloader />;
	}

	return (
		<main>
			<h1>Dashboard</h1>
			<AssetsWidget data={data} />
			<ChartsWidget data={data} />
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
