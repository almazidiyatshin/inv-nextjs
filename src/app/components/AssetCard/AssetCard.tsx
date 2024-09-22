'use client';

import { useEffect, useState } from 'react';
import { TbCopy as CopyIcon } from 'react-icons/tb';
import styles from './styles.module.css';

type TProps = {
	title: string;
	value: number;
	prevValue?: number;
};

const COPY_TEXT = 'Click to copy';

export const AssetCard = ({ title, value, prevValue }: TProps) => {
	const [tooltipText, setTooltipText] = useState<string>(COPY_TEXT);

	useEffect(() => {
		const timerId = setTimeout(() => setTooltipText(COPY_TEXT), 2000);

		return () => {
			clearTimeout(timerId);
		};
	}, [tooltipText]);

	return (
		<div className={styles.card}>
			<p className={styles.title}>{title}</p>
			<div
				className={styles.value}
				onClick={() => {
					const rawValue = value.toFixed();
					navigator.clipboard.writeText(rawValue);
					setTooltipText('Copied!');
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
				<div className={styles.tooltip}>
					{tooltipText}
					{tooltipText === COPY_TEXT && <CopyIcon />}
				</div>
			</div>
			{prevValue && <p>{prevValue} Last month (+20%)</p>}
		</div>
	);
};
