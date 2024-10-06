import { ERatesIds } from '@/constants/common';

import styles from './styles.module.css';
import { Indicator } from '@/app/components/Indicator';

type TProps = {
	data: string[];
};

export const IndicatorsWidget = ({ data }: TProps) => {
	const [inflationRate, keyRate] = data;

	const ratesConfig = [
		{
			id: ERatesIds.INFLATION,
			title: 'Inflation rate',
			value: inflationRate,
		},
		{
			id: ERatesIds.KEY,
			title: 'Key rate',
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
