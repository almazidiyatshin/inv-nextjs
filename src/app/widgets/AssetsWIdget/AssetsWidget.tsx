'use client';

import { AssetCard } from '@/app/components/AssetCard';
import styles from './styles.module.css';
import { TPostPortfolioData } from '@/config/api/types';
import { memo } from 'react';

type TProps = {
	data: TPostPortfolioData;
};

export const AssetsWidget = memo<TProps>(({ data }) => {
	// const today = new Date();
	// const lastMonth = new Date();
	// lastMonth.setMonth(today.getMonth() - 1);
	// const formatDateToISO = (date: Date): string => {
	// 	return date.toISOString();
	// };
	// const todayISO = formatDateToISO(today);
	// const lastMonthISO = formatDateToISO(lastMonth);

	// const priceLastMonth = await getAssetData({
	// 	dateFrom: lastMonthISO,
	// 	dateTo: todayISO,
	// 	instrumentId: etfIds.T_GOLD,
	// });

	const { totalSum, allSharesSum, allBondsSum, goldSum } = data;

	const assetsConfig = [
		{ title: 'All assets value', value: totalSum },
		{ title: 'All shares value', value: allSharesSum },
		{ title: 'All bonds value', value: allBondsSum },
		{
			title: 'Gold value',
			value: goldSum,
			// prevValue: priceLastMonth * Number(goldUnits),
		},
	];

	return (
		<div className={styles.assetsContainer}>
			{assetsConfig.map(({ title, value }) => (
				<AssetCard key={title} title={title} value={value} />
			))}
		</div>
	);
});
