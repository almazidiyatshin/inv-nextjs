'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { TbCopyPlus as CopyIcon } from 'react-icons/tb';
import cn from 'classnames';
import { Label } from '../Label';

type TProps = {
	title: string;
	value: number;
};

export const AssetCard = ({ title, value }: TProps) => {
	const [isCopied, setIsCopied] = useState<boolean>(false);

	useEffect(() => {
		let timerId: NodeJS.Timeout;

		if (isCopied) {
			timerId = setTimeout(() => setIsCopied(false), 1000);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [isCopied]);

	return (
		<div className={styles.card}>
			<Label title="Indicator" />
			<p className={styles.title}>{title}</p>
			<div
				className={styles.valueContainer}
				onClick={() => {
					const rawValue = value.toFixed();
					navigator.clipboard.writeText(rawValue);
					setIsCopied(true);
				}}
			>
				<p className={styles.value}>
					{value.toLocaleString('ru-RU', {
						style: 'currency',
						currency: 'RUB',
						minimumFractionDigits: 0,
						maximumFractionDigits: 0,
					})}
				</p>
				<CopyIcon className={styles.icon} />
				<div className={cn(styles.tooltip, { [styles.visible]: isCopied })}>
					Copied!
				</div>
			</div>
		</div>
	);
};
