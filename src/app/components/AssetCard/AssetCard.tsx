'use client';

import styles from './styles.module.css';
import { TbCopyPlus as CopyIcon } from 'react-icons/tb';

type TProps = {
	title: string;
	value: number;
};

export const AssetCard = ({ title, value }: TProps) => (
	<div className={styles.card}>
		<p className={styles.title}>{title}</p>
		<div
			className={styles.value}
			onClick={() => {
				const rawValue = value.toFixed();
				navigator.clipboard.writeText(rawValue);
			}}
		>
			<p>
				{value.toLocaleString('ru-RU', {
					style: 'currency',
					currency: 'RUB',
					minimumFractionDigits: 0,
					maximumFractionDigits: 0,
				})}
			</p>
			<CopyIcon className={styles.icon} />
		</div>
	</div>
);
