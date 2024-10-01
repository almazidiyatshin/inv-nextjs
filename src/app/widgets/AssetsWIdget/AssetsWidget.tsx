'use client';

import { AssetCard } from '@/app/components/AssetCard';
import styles from './styles.module.css';
import { TPostPortfolioData } from '@/config/api';
import { memo } from 'react';
import { EAssetIds, etfIds, sharesIds } from '@/constants/common';

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
		beluCount,
		chmfCount,
		lkohCount,
		magnCount,
		mgntCount,
		nlmkCount,
		// novaCount,
		rosnCount,
		sberpCount,
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
				{ [sharesIds.BELU]: Number(beluCount) },
				{ [sharesIds.CHMF]: Number(chmfCount) },
				{ [sharesIds.LKOH]: Number(lkohCount) },
				{ [sharesIds.MAGN]: Number(magnCount) },
				{ [sharesIds.MGNT]: Number(mgntCount) },
				{ [sharesIds.NLMK]: Number(nlmkCount) },
				// { [sharesIds.NOVA]: Number(novaCount) },
				{ [sharesIds.ROSN]: Number(rosnCount) },
				{ [sharesIds.SBERP]: Number(sberpCount) },
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
				<AssetCard key={config.id} {...config} />
			))}
		</div>
	);
});

AssetsWidget.displayName = 'AssetsWidget';
