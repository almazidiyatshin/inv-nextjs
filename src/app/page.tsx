import { EEtfIds, IPortfolioResponse } from '@/types/tInvest';
import { getEtfData, getFloatCost } from '@/utils/tInvest';

import './styles.css';
import cn from 'classnames';

import { IBM_Plex_Mono } from 'next/font/google';
import { CommonChart } from './components/CommonChart';
import { BondsChart } from './components/BondsChart';
const inter = IBM_Plex_Mono({
	weight: ['400', '600'],
	subsets: ['latin'],
});

// const TAXES = 15;
// const INFLATION = 9;
// const EXPECTED_INCOME = 12;
// const WEEKS_PER_YEAR = 52;
// const AIM = 36000000;
// const PERIOD = 25;

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

	// const middleIncome =
	// 	(EXPECTED_INCOME / WEEKS_PER_YEAR + INFLATION / WEEKS_PER_YEAR) / 2 / 100;

	// const aimWithInflation = AIM * (1 + INFLATION / 100) ** PERIOD;
	// const aimWithTaxesAndInflation =
	// 	aimWithInflation + aimWithInflation * (TAXES / 100);

	// const middlePayment =
	// 	aimWithTaxesAndInflation /
	// 	(PERIOD * 52 * (1 + middleIncome) ** (PERIOD * 52));

	return {
		currentSharesCost: totalShareSum,
		currentBondsCost: totalBondSum,
		currentGoldCost: totalGoldSum,
		currentTotalCost: totalShareSum + totalBondSum + totalGoldSum,
		currentTBondsSum: totalTBondsSum,
		currentTLocalBondsSum: totalTLocalBondsSum,
	};
};

export default async function Page() {
	const data = await getData();

	return (
		<main className={inter.className}>
			<h1>Dashboard</h1>

			<div className="container">
				<div className="card">
					<p className="title">Shares</p>
					<p>{data.currentSharesCost.toFixed()}</p>
				</div>
				<div className="card">
					<p className="title">Bonds</p>
					<p>{data.currentBondsCost.toFixed()}</p>
				</div>
				<div className="card">
					<p className="title">Gold</p>
					<p>{data.currentGoldCost.toFixed()}</p>
				</div>
			</div>

			<div className={cn('container', 'chartContainer')}>
				<div className="chartCard">
					<p className="title">Common</p>
					<CommonChart
						costs={[
							(data.currentSharesCost / data.currentTotalCost) * 100,
							(data.currentBondsCost / data.currentTotalCost) * 100,
							(data.currentGoldCost / data.currentTotalCost) * 100,
						]}
					/>
				</div>
				<div className="chartCard">
					<p className="title">Bonds</p>
					<BondsChart
						costs={[
							(data.currentTBondsSum / data.currentBondsCost) * 100,
							(data.currentTLocalBondsSum / data.currentBondsCost) * 100,
						]}
					/>
				</div>
			</div>
		</main>
	);
}
