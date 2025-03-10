'use client';

import { AssetCard } from '@/app/components/AssetCard';
import styles from './styles.module.css';
import { TPostPortfolioData } from '@/config/api';
import { memo, useState } from 'react';
import { EAssetIds, etfIds, sharesIds } from '@/constants/common';
import { useTranslation } from '@/app/hooks/useTranslation';

type TProps = {
	data: TPostPortfolioData;
};

export const AssetsWidget = memo<TProps>(({ data }) => {
	const t = useTranslation();

	const {
		allSharesSum,
		allBondsSum,
		goldSum,
		tgldCount,
		tbruCount,
		tlcbCount,
		tofzCount,
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
				{ [etfIds.TOFZ]: Number(tofzCount) },
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

	const [cardExpanding, setCardExpanding] = useState(() => {
		const map = new Map<string, boolean>();
		assetsConfig.forEach(({ id }) => map.set(id, false));
		return map;
	});

	const toggleCardExpanding = (id: EAssetIds) => () =>
		setCardExpanding((prev) => {
			const copy = new Map(prev);

			copy.forEach((_, key) => {
				copy.set(key, key !== id ? false : !copy.get(key));
			});

			return copy;
		});

	return (
		<div className={styles.assetsContainer}>
			{assetsConfig.map((config) => (
				<AssetCard
					key={config.id}
					isExpanded={cardExpanding.get(config.id)}
					onToggle={toggleCardExpanding(config.id)}
					{...config}
				/>
			))}
		</div>
	);
});

AssetsWidget.displayName = 'AssetsWidget';
