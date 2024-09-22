'use client';

import { Provider } from 'react-redux';
import './global.css';

import { AssetsWidget } from './widgets/AssetsWIdget';
import { ChartsWidget } from './widgets/ChartsWidget';
import { store } from '@/config/store';
import { useEffect } from 'react';
import { usePostPortfolioMutation } from '@/config/api/tInvestApi';

const InnerPage = () => {
	const [getPortfolio, { data, isLoading }] = usePostPortfolioMutation();

	useEffect(() => {
		getPortfolio();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data) {
		return <div>Loading...</div>;
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
