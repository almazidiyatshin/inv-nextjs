'use client';

import { useEffect, useState } from 'react';
import { TbCopy as CopyIcon } from 'react-icons/tb';
import styles from './styles.module.css';
import { PrevValue } from './components/PrevValue';
import { toRub } from '@/app/utils/toRub';
import { EAssetIds } from '@/constants/common';

type TProps = {
	id: EAssetIds;
	title: string;
	value: number;
	count?: number;
};

const COPY_TEXT = 'Click to copy';

export const AssetCard = ({ id, title, value, count }: TProps) => {
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
				<p>{toRub(value)}</p>
				<div className={styles.tooltip}>
					{tooltipText}
					{tooltipText === COPY_TEXT && <CopyIcon />}
				</div>
			</div>
			{count && <PrevValue id={id} value={value} count={count} />}
		</div>
	);
};
