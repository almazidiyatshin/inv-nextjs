'use client';

import { useEffect, useState } from 'react';
import { TbCopy as CopyIcon } from 'react-icons/tb';
import styles from './styles.module.css';
import { PrevValue } from './components/PrevValue';
import { toRub } from '@/app/utils/toRub';
import { EAssetIds } from '@/constants/common';
import cn from 'classnames';

type TProps = {
	id: EAssetIds;
	title: string;
	value: number;
	counts?: {
		[x: string]: number;
	}[];
	isPrimary: boolean;
};

const COPY_TEXT = 'Click to copy';

export const AssetCard = ({ id, title, value, counts, isPrimary }: TProps) => {
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
				className={cn(styles.value, { [styles.value__primary]: isPrimary })}
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
			{counts && <PrevValue id={id} value={value} counts={counts} />}
		</div>
	);
};
