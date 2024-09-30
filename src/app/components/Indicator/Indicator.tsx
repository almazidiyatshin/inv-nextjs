'use client';

import { TbInfoSquareRounded as InfoIcon } from 'react-icons/tb';
import styles from './styles.module.css';

type TProps = {
	title: string;
	value: string;
};

export const Indicator = ({ title, value }: TProps) => {
	return (
		<div className={styles.indicator}>
			<InfoIcon className={styles.icon} />
			<div className={styles.text}>
				<p className={styles.title}>{`${title}:`}</p>
				<p className={styles.value}>{value}</p>
			</div>
		</div>
	);
};
