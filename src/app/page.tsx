import { EEtfIds, IPortfolioResponse } from '@/types/tInvest';
import { getEtfData, getFloatCost } from '@/utils/tInvest';

import styles from './styles.module.css';
import './global.css';
import cn from 'classnames';

import { IBM_Plex_Mono } from 'next/font/google';
import { ChartCard } from './components/ChartCard';
import { AssetCard } from './components/AssetCard';

const inter = IBM_Plex_Mono({
	weight: ['400', '600'],
	subsets: ['latin'],
});

const getData = async () => {
	const request = await import('../app/api/list/route');
	const response: IPortfolioResponse = await (await request.POST()).json();

	const {
		currentPriceInt: TiMOEXCurrentPriceInt,
		currentPriceNano: TiMOEXCurrentPriceNano,
		units: TiMOEXUnits,
	} = getEtfData(EEtfIds.TiMOEX, response);
	const {
		currentPriceInt: TRosTechCurrentPriceInt,
		currentPriceNano: TRosTechCurrentPriceNano,
		units: TRosTechUnits,
	} = getEtfData(EEtfIds.TRosTech, response);
	const {
		currentPriceInt: TBondsCurrentPriceInt,
		currentPriceNano: TBondsCurrentPriceNano,
		units: TBondsUnits,
	} = getEtfData(EEtfIds.TBonds, response);
	const {
		currentPriceInt: TLocalBondsCurrentPriceInt,
		currentPriceNano: TLocalBondsCurrentPriceNano,
		units: TLocalBondsUnits,
	} = getEtfData(EEtfIds.TLocalBonds, response);
	const {
		currentPriceInt: TGoldCurrentPriceInt,
		currentPriceNano: TGoldCurrentPriceNano,
		units: TGoldsUnits,
	} = getEtfData(EEtfIds.TGold, response);

	const totalTRosTechSum =
		getFloatCost(TRosTechCurrentPriceInt, TRosTechCurrentPriceNano) *
		Number(TRosTechUnits);
	const totalTiMoexSum =
		getFloatCost(TiMOEXCurrentPriceInt, TiMOEXCurrentPriceNano) *
		Number(TiMOEXUnits);
	const totalTBondsSum =
		getFloatCost(TBondsCurrentPriceInt, TBondsCurrentPriceNano) *
		Number(TBondsUnits);
	const totalTLocalBondsSum =
		getFloatCost(TLocalBondsCurrentPriceInt, TLocalBondsCurrentPriceNano) *
		Number(TLocalBondsUnits);
	const totalShareSum =
		getFloatCost(
			response.totalAmountShares.units,
			response.totalAmountShares.nano
		) +
		totalTiMoexSum +
		totalTRosTechSum;
	const totalBondSum = totalTBondsSum + totalTLocalBondsSum;
	const totalGoldSum =
		getFloatCost(TGoldCurrentPriceInt, TGoldCurrentPriceNano) *
		Number(TGoldsUnits);

	return {
		sharesSum: totalShareSum,
		bondsSum: totalBondSum,
		goldSum: totalGoldSum,
		totalSum: totalShareSum + totalBondSum + totalGoldSum,
		tBondsSum: totalTBondsSum,
		tLocalBondsSum: totalTLocalBondsSum,
	};
};

export default async function Page() {
	const data = await getData();

	const assetCards = [
		{ title: 'Shares', value: data.sharesSum },
		{ title: 'Bonds', value: data.bondsSum },
		{ title: 'Gold', value: data.goldSum },
	];

	const chartCards = [
		{
			title: 'Common',
			labels: ['Shares', 'Bonds', 'Gold'],
			values: [
				(data.sharesSum / data.totalSum) * 100,
				(data.bondsSum / data.totalSum) * 100,
				(data.goldSum / data.totalSum) * 100,
			],
			colors: [
				'rgb(250, 128, 114)',
				'rgb(135, 206, 250)',
				'rgb(240, 230, 140)',
			],
		},
		{
			title: 'Bonds',
			labels: ['TBonds', 'TLBonds'],
			values: [
				(data.tBondsSum / data.bondsSum) * 100,
				(data.tLocalBondsSum / data.bondsSum) * 100,
			],
			colors: ['rgb(176, 224, 230)', 'rgb(135, 206, 235)'],
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
				{chartCards.map(({ title, labels, values, colors }) => (
					<ChartCard
						title={title}
						labels={labels}
						values={values}
						colors={colors}
					/>
				))}
			</div>
		</main>
	);
}
