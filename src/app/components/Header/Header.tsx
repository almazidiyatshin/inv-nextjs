import { IndicatorsWidget } from '@/app/widgets/IndicatorsWidget';
import { TGetIndicatorsResponse } from '@/config/api';

import styles from './styles.module.css';

type TProps = {
	indicators: TGetIndicatorsResponse;
};

export const Header = ({ indicators }: TProps) => {
	return (
		<div className={styles.header}>
			<h1 className={styles.title}>Dashboard</h1>
			<IndicatorsWidget data={indicators} />
		</div>
	);
};
