'use client';

import styles from './styles.module.css';

type TProps = {
	title: string;
	value: string;
};

export const IndicatorCard = ({ title, value }: TProps) => {
	return (
		<div className={styles.card}>
			<div className={styles.titleWrapper}>
				<p className={styles.title}>{title}</p>
			</div>
			<div className={styles.value}>
				<p>{value}</p>
			</div>
		</div>
	);
};
