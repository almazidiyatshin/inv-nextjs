import styles from './styles.module.css';
import './global.css';
import cn from 'classnames';

import { IBM_Plex_Mono } from 'next/font/google';
import { ChartCard } from './components/ChartCard';
import { AssetCard } from './components/AssetCard';
import { getData } from '@/utils/getData';

const inter = IBM_Plex_Mono({
	weight: ['400', '600'],
	subsets: ['latin'],
});

export default async function Page() {
	const data = await getData();
	const {
		sharesSum,
		bondsSum,
		goldSum,
		totalSum,
		tBondsSum,
		tLocalBondsSum,
		otherSharesSum,
		tIMOEXSum,
		tRosTechSum,
	} = data;

	const assetCards = [
		{ title: 'Shares', value: sharesSum },
		{ title: 'Bonds', value: bondsSum },
		{ title: 'Gold', value: goldSum },
	];

	const chartCards = [
		{
			title: 'All',
			labels: ['Shares', 'Bonds', 'Gold'],
			values: [
				(sharesSum / totalSum) * 100,
				(bondsSum / totalSum) * 100,
				(goldSum / totalSum) * 100,
			],
			colorSchema: ['#FF8885', '#61C4FF', '#FFE585'],
		},
		{
			title: 'Bonds',
			labels: ['TBonds', 'TLocal'],
			values: [(tBondsSum / bondsSum) * 100, (tLocalBondsSum / bondsSum) * 100],
			colorSchema: ['#65AEFF', '#8EC4FF'],
		},
		{
			title: 'Shares',
			labels: ['Other shares', 'TiMOEX', 'TRosTech'],
			values: [
				(otherSharesSum / sharesSum) * 100,
				(tIMOEXSum / sharesSum) * 100,
				(tRosTechSum / sharesSum) * 100,
			],
			colorSchema: ['#FF8B85', '#FFC985', '#FF85E4'],
		},
	];

	return (
		<main className={inter.className}>
			<h1>Dashboard</h1>

			<div className={styles.commonContainer}>
				{assetCards.map(({ title, value }) => (
					<AssetCard title={title} value={value} />
				))}
			</div>

			<div className={cn(styles.commonContainer, styles.chartsContainer)}>
				{chartCards.map(({ title, labels, values, colorSchema }) => (
					<ChartCard
						title={title}
						labels={labels}
						values={values}
						colorSchema={colorSchema}
					/>
				))}
			</div>
		</main>
	);
}
