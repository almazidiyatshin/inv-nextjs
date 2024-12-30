'use client';

import { useEffect, useState } from 'react';
import { TbCopy as CopyIcon } from 'react-icons/tb';
import { TbTrendingUp as TrendUpIcon } from 'react-icons/tb';
import { TbTrendingDown as TrendDownIcon } from 'react-icons/tb';
import styles from './styles.module.css';
import { PrevValue } from './components/PrevValue';
import { toRub } from '@/app/utils/toRub';
import { EAssetIds } from '@/constants/common';
import cn from 'classnames';
import { useTranslation } from '@/app/hooks/useTranslation';

type TProps = {
	id: EAssetIds;
	title: string;
	value: number;
	counts?: {
		[x: string]: number;
	}[];
	isPrimary?: boolean;
};

export const AssetCard = ({ id, title, value, counts, isPrimary }: TProps) => {
	const t = useTranslation();

	const [tooltipText, setTooltipText] = useState<string>(t('clickToCopy'));
	const [trend, setTrend] = useState<'up' | 'down' | undefined>(undefined);

	useEffect(() => {
		const timerId = setTimeout(() => setTooltipText(t('clickToCopy')), 2000);

		return () => {
			clearTimeout(timerId);
		};
	}, [tooltipText, t]);

	return (
		<div className={styles.card}>
			<div className={styles.titleWrapper}>
				<p className={styles.title}>{title}</p>
				{!isPrimary &&
					!!trend &&
					(trend === 'up' ? (
						<TrendUpIcon size={20} className={styles.trendUpIcon} />
					) : (
						<TrendDownIcon size={20} className={styles.trendDownIcon} />
					))}
			</div>
			<div
				className={cn(styles.value, { [styles.value__primary]: isPrimary })}
				onClick={() => {
					const rawValue = value.toFixed();
					navigator.clipboard.writeText(rawValue);
					setTooltipText(t('copied'));
				}}
			>
				{!isPrimary && (
					<div className={styles.tooltip}>
						{tooltipText}
						{tooltipText === t('clickToCopy') && <CopyIcon />}
					</div>
				)}
				<p>{toRub(value)}</p>
			</div>
			{counts && (
				<PrevValue id={id} value={value} counts={counts} setTrend={setTrend} />
			)}
		</div>
	);
};
