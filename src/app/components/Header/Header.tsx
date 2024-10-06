import { IndicatorsWidget } from '@/app/widgets/IndicatorsWidget';

import styles from './styles.module.css';

type TProps = {
	indicators: string[];
};

export const Header = ({ indicators }: TProps) => (
	<div className={styles.header}>
		<h1 className={styles.title}>Dashboard</h1>
		{indicators.length > 1 && <IndicatorsWidget data={indicators} />}
	</div>
);
