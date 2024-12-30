import { ERatesIds } from '@/constants/common';

import styles from './styles.module.css';
import { Indicator } from '@/app/components/Indicator';
import { TLocale, useTranslation } from '@/app/hooks/useTranslation';

type TProps = {
	data: string[];
	locale: TLocale;
};

export const IndicatorsWidget = ({ data, locale }: TProps) => {
	const t = useTranslation(locale);

	const [inflationRate, keyRate] = data;

	const ratesConfig = [
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
	];

	return (
		<div className={styles.ratesContainer}>
			{ratesConfig.map((config) => (
				<Indicator key={config.id} {...config} />
			))}
		</div>
	);
};
