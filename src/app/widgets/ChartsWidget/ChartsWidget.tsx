'use client';

import { ChartCard } from '@/app/components/ChartCard';
import styles from './styles.module.css';
import { memo } from 'react';
import { TPostPortfolioData } from '@/config/api';
import { chartColorSchema } from '@/constants/colors';
import { useTranslation } from '@/app/hooks/useTranslation';

type TProps = {
	data: TPostPortfolioData;
};

export const ChartsWidget = memo<TProps>(({ data }) => {
	const t = useTranslation();

	const {
		allSharesSum,
		allBondsSum,
		goldSum,
		tbruSum,
		tlcbSum,
		tpaySum,
		lqdtSum,
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
	const lqdtPercent = (lqdtSum / allBondsSum) * 100;

	const otherSharesPercent = (otherSharesSum / allSharesSum) * 100;
	const tmosPercent = (tmosSum / allSharesSum) * 100;
	const titrPercent = (titrSum / allSharesSum) * 100;

	const chartsCongif = [
		{
			title: t('allAssetsStatistics'),
			labels: [
				`${t('shares')} (${allSharesPercent.toFixed(0)}%)`,
				`${t('bonds')} (${allBondsPercent.toFixed(0)}%)`,
				`${t('gold')} (${goldPercent.toFixed(0)}%)`,
			],
			values: [allSharesPercent, allBondsPercent, goldPercent],
			colorSchema: chartColorSchema,
		},
		{
			title: t('allBondsStatistics'),
			labels: [
				`TBRU (${tbruPercent.toFixed(0)}%)`,
				`TLCB (${tlcbPercent.toFixed(0)}%)`,
				`TPAY (${tpayPercent.toFixed(0)}%)`,
				`LQDT (${lqdtPercent.toFixed(0)}%)`,
			],
			values: [tbruPercent, tlcbPercent, tpayPercent, lqdtPercent],
			colorSchema: chartColorSchema,
		},
		{
			title: t('allSharesStatistics'),
			labels: [
				`${t('otherShares')} (${otherSharesPercent.toFixed(0)}%)`,
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
