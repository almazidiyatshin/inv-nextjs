'use client';

import { ChartCard } from '@/app/components/ChartCard';
import styles from './styles.module.css';
import { memo } from 'react';
import { TPostPortfolioData } from '@/config/api';
import {
	chartColorSchema,
	chartColorSchemaDark,
	chartLabelColor,
	chartLabelColorDark,
} from '@/constants/colors';
import { useTranslation } from '@/app/hooks/useTranslation';
import { useTheme } from '@/config/providers';

type TProps = {
	data: TPostPortfolioData;
};

export const ChartsWidget = memo<TProps>(({ data }) => {
	const t = useTranslation();
	const { theme } = useTheme();
	const isDarkTheme = theme === 'dark';
	const colorSchema = isDarkTheme ? chartColorSchemaDark : chartColorSchema;
	const labelColor = isDarkTheme ? chartLabelColorDark : chartLabelColor;

	const {
		allSharesSum,
		allBondsSum,
		goldSum,
		tbruSum,
		tlcbSum,
		tofzSum,
		otherSharesSum,
		tmosSum,
		totalSum,
	} = data;

	const allSharesPercent = (allSharesSum / totalSum) * 100;
	const allBondsPercent = (allBondsSum / totalSum) * 100;
	const goldPercent = (goldSum / totalSum) * 100;

	const tbruPercent = (tbruSum / allBondsSum) * 100;
	const tlcbPercent = (tlcbSum / allBondsSum) * 100;
	const tofzPercent = (tofzSum / allBondsSum) * 100;

	const otherSharesPercent = (otherSharesSum / allSharesSum) * 100;
	const tmosPercent = (tmosSum / allSharesSum) * 100;

	const chartsCongif = [
		{
			title: t('allAssetsStatistics'),
			labels: [
				`${t('shares')} (${allSharesPercent.toFixed(0)}%)`,
				`${t('bonds')} (${allBondsPercent.toFixed(0)}%)`,
				`${t('gold')} (${goldPercent.toFixed(0)}%)`,
			],
			values: [allSharesPercent, allBondsPercent, goldPercent],
			colorSchema,
		},
		{
			title: t('allBondsStatistics'),
			labels: [
				`TBRU (${tbruPercent.toFixed(0)}%)`,
				`TLCB (${tlcbPercent.toFixed(0)}%)`,
				`TOFZ (${tofzPercent.toFixed(0)}%)`,
			],
			values: [tbruPercent, tlcbPercent, tofzPercent],
			colorSchema,
		},
		{
			title: t('allSharesStatistics'),
			labels: [
				`${t('otherShares')} (${otherSharesPercent.toFixed(0)}%)`,
				`TMOS (${tmosPercent.toFixed(0)}%)`,
			],
			values: [otherSharesPercent, tmosPercent],
			colorSchema,
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
					labelColor={labelColor}
				/>
			))}
		</div>
	);
});

ChartsWidget.displayName = 'ChartsWidget';
