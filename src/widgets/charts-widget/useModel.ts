import { useTranslation } from 'shared/lib';
import { TChartsWidgetProps } from './types';

export const useModel = ({ data }: TChartsWidgetProps) => {
	const t = useTranslation();

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
			dataSet: [
				{ name: t('shares'), value: allSharesPercent, color: 'teal.500' },
				{ name: t('bonds'), value: allBondsPercent, color: 'teal.400' },
				{ name: t('gold'), value: goldPercent, color: 'teal.300' },
			],
		},
		{
			title: t('allBondsStatistics'),
			dataSet: [
				{ name: 'TBRU', value: tbruPercent, color: 'teal.500' },
				{ name: 'TLCB', value: tlcbPercent, color: 'teal.400' },
				{ name: 'TOFZ', value: tofzPercent, color: 'teal.300' },
			],
		},
		{
			title: t('allSharesStatistics'),
			dataSet: [
				{
					name: t('other'),
					value: otherSharesPercent,
					color: 'teal.500',
				},
				{ name: 'TMOS', value: tmosPercent, color: 'teal.400' },
			],
		},
	];

	return { chartsCongif };
};
