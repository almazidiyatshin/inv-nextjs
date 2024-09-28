'use client';

import { AssetCard } from '@/app/components/AssetCard';
import styles from './styles.module.css';
import { TPostPortfolioData } from '@/config/api/types';
import { memo } from 'react';
import { EAssetIds } from '@/constants/common';

type TProps = {
	data: TPostPortfolioData;
};

export const AssetsWidget = memo<TProps>(({ data }) => {
	const { totalSum, allSharesSum, allBondsSum, goldSum, goldUnits } = data;

	const assetsConfig = [
		{ id: EAssetIds.ALL, title: 'All assets value', value: totalSum },
		{ id: EAssetIds.SHARES, title: 'All shares value', value: allSharesSum },
		{ id: EAssetIds.BONDS, title: 'All bonds value', value: allBondsSum },
		{
			id: EAssetIds.GOLD,
			title: 'Gold value',
			value: goldSum,
			count: Number(goldUnits),
		},
	];

	return (
		<div className={styles.assetsContainer}>
			{assetsConfig.map(({ id, title, value, count }) => (
				<AssetCard id={id} key={id} title={title} value={value} count={count} />
			))}
		</div>
	);
});
