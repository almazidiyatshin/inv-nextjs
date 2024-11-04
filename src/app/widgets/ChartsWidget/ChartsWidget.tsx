'use client';

import { ChartCard } from '@/app/components/ChartCard';
import styles from './styles.module.css';
import { memo } from 'react';
import { TPostPortfolioData } from '@/config/api';
import { chartColorSchema } from '@/constants/colors';

type TProps = {
	data: TPostPortfolioData;
};

export const ChartsWidget = memo<TProps>(({ data }) => {
	const {
		allSharesSum,
		allBondsSum,
		goldSum,
		tbruSum,
		tlcbSum,
		tpaySum,
		otherSharesSum,
		tmosSum,
		titrSum,
		totalSum,
	} = data;

	const allSharesPercent = (allSharesSum / totalSum) * 100;
	const allBondsPercent = (allBondsSum / totalSum) * 100;
	const goldPercent = (goldSum / totalSum) * 100;

	const tbruPercent = (tbruSum / allBondsSum) * 100;
	const tlcbPercent = (tlcbSum / allBondsSum) * 100;
	const tpayPercent = (tpaySum / allBondsSum) * 100;

	const otherSharesPercent = (otherSharesSum / allSharesSum) * 100;
	const tmosPercent = (tmosSum / allSharesSum) * 100;
	const titrPercent = (titrSum / allSharesSum) * 100;

	const chartsCongif = [
		{
			title: 'All assets statistics',
			labels: [
				`Shares (${allSharesPercent.toFixed(0)}%)`,
				`Bonds (${allBondsPercent.toFixed(0)}%)`,
				`Gold (${goldPercent.toFixed(0)}%)`,
			],
			values: [allSharesPercent, allBondsPercent, goldPercent],
			colorSchema: chartColorSchema,
		},
		{
			title: 'All bonds statistics',
			labels: [
				`TBRU (${tbruPercent.toFixed(0)}%)`,
				`TLCB (${tlcbPercent.toFixed(0)}%)`,
				`TPAY (${tpayPercent.toFixed(0)}%)`,
			],
			values: [tbruPercent, tlcbPercent, tpayPercent],
			colorSchema: chartColorSchema,
		},
		{
			title: 'All shares statistics',
			labels: [
				`Other shares (${otherSharesPercent.toFixed(0)}%)`,
				`TMOS (${tmosPercent.toFixed(0)}%)`,
				`TITR (${titrPercent.toFixed(0)}%)`,
			],
			values: [otherSharesPercent, tmosPercent, titrPercent],
			colorSchema: chartColorSchema,
		},
	];

	return (
		<div className={styles.chartsContainer}>
			{chartsCongif.map(({ title, labels, values, colorSchema }) => (
				<ChartCard
					key={title}
					title={title}
					labels={labels}
					values={values}
					colorSchema={colorSchema}
				/>
			))}
		</div>
	);
});

ChartsWidget.displayName = 'ChartsWidget';
