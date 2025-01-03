'use client';

import { AssetCard } from '@/app/components/AssetCard';
import styles from './styles.module.css';
import { TPostPortfolioData } from '@/config/api';
import { memo } from 'react';
import { EAssetIds, etfIds, sharesIds } from '@/constants/common';
import { useTranslation } from '@/app/hooks/useTranslation';

type TProps = {
	data: TPostPortfolioData;
};

export const AssetsWidget = memo<TProps>(({ data }) => {
	const t = useTranslation();

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
		magnCount,
		mgntCount,
		nlmkCount,
		sberpCount,
		lqdtCount,
	} = data;

	const assetsConfig = [
		{
			id: EAssetIds.ALL,
			title: t('allAssetsValue'),
			value: totalSum,
			isPrimary: true,
		},
		{
			id: EAssetIds.SHARES,
			title: t('allSharesValue'),
			value: allSharesSum,
			counts: [
				{ [etfIds.TMOS]: Number(tmosCount) },
				{ [etfIds.TITR]: Number(titrCount) },
				{ [sharesIds.BELU]: Number(beluCount) },
				{ [sharesIds.CHMF]: Number(chmfCount) },
				{ [sharesIds.MAGN]: Number(magnCount) },
				{ [sharesIds.MGNT]: Number(mgntCount) },
				{ [sharesIds.NLMK]: Number(nlmkCount) },
				{ [sharesIds.SBERP]: Number(sberpCount) },
			],
		},
		{
			id: EAssetIds.BONDS,
			title: t('allBondsValue'),
			value: allBondsSum,
			counts: [
				{ [etfIds.TBRU]: Number(tbruCount) },
				{ [etfIds.TLCB]: Number(tlcbCount) },
				{ [etfIds.TPAY]: Number(tpayCount) },
				{ [etfIds.LQDT]: Number(lqdtCount) },
			],
		},
		{
			id: EAssetIds.GOLD,
			title: t('goldValue'),
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
