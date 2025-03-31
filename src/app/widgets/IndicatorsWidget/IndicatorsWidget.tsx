'use client';

import styles from './styles.module.css';
import { TPostPortfolioData } from '@/config/api';
import { memo } from 'react';
import { useTranslation } from '@/app/hooks/useTranslation';
import { IndicatorCard } from '@/app/components/IndicatorCard';
import { ERatesIds } from '@/constants/common';
import {
	TGetIndicatorsApiReturn,
	TGetMoexIndexApiReturn,
} from '@/config/api/commonApi/types';
import { toRub } from '@/app/utils/toRub';

type TProps = {
	portfolioData: TPostPortfolioData;
	indicatorsData: TGetIndicatorsApiReturn;
	moexIndex: TGetMoexIndexApiReturn;
};

export const IndicatorsWidget = memo<TProps>(
	({ portfolioData, indicatorsData, moexIndex }) => {
		const t = useTranslation();

		const { totalSum } = portfolioData;
		const [inflationRate, keyRate] = indicatorsData;

		const paramsConfig = [
			{
				id: ERatesIds.TOTAL,
				title: t('allAssetsValue'),
				value: toRub(totalSum),
			},
			{
				id: ERatesIds.INFLATION,
				title: t('inflationRate'),
				value: inflationRate,
			},
			{
				id: ERatesIds.KEY,
				title: t('keyRate'),
				value: keyRate,
			},
			{
				id: ERatesIds.MOEX,
				title: t('moexIndex'),
				value: moexIndex,
			},
		];

		return (
			<div className={styles.paramsContainer}>
				{paramsConfig.map((config) => (
					<IndicatorCard key={config.id} {...config} />
				))}
			</div>
		);
	}
);

IndicatorsWidget.displayName = 'IndicatorsWidget';
