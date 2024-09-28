'use client';

import { AssetCard } from '@/app/components/AssetCard';
import styles from './styles.module.css';
import { TPostPortfolioData } from '@/config/api/types';
import { memo } from 'react';
import { EAssetIds, etfIds } from '@/constants/common';

type TProps = {
	data: TPostPortfolioData;
};

export const AssetsWidget = memo<TProps>(({ data }) => {
	const {
		totalSum,
		allSharesSum,
		allBondsSum,
		goldSum,
		tgldCount,
		tbruCount,
		tlcbCount,
		tpayCount,
		tmosCount,
		titrCount,
	} = data;

	const assetsConfig = [
		{
			id: EAssetIds.ALL,
			title: 'All assets value',
			value: totalSum,
			isPrimary: true,
		},
		{
			id: EAssetIds.SHARES,
			title: 'All shares value',
			value: allSharesSum,
			counts: [
				{ [etfIds.TMOS]: Number(tmosCount) },
				{ [etfIds.TITR]: Number(titrCount) },
			],
		},
		{
			id: EAssetIds.BONDS,
			title: 'All bonds value',
			value: allBondsSum,
			counts: [
				{ [etfIds.TBRU]: Number(tbruCount) },
				{ [etfIds.TLCB]: Number(tlcbCount) },
				{ [etfIds.TPAY]: Number(tpayCount) },
			],
		},
		{
			id: EAssetIds.GOLD,
			title: 'Gold value',
			value: goldSum,
			counts: [{ [etfIds.TGLD]: Number(tgldCount) }],
		},
	];

	return (
		<div className={styles.assetsContainer}>
			{assetsConfig.map((config) => (
				<AssetCard {...config} />
			))}
		</div>
	);
});
