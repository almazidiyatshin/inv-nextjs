import { ERatesIds } from 'shared/constants';
import { useTranslation } from 'shared/lib';
import { toRub } from 'shared/utils';
import { TIndicatorsWidgetProps } from './types';

export const useModel = ({
	portfolioData,
	indicatorsData,
	moexIndex,
}: TIndicatorsWidgetProps) => {
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

	return { paramsConfig };
};
