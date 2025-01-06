'use client';

import { useEffect, useState } from 'react';
import { TbCopy as CopyIcon } from 'react-icons/tb';
import styles from './styles.module.css';
import { PrevValue } from './components/PrevValue';
import { toRub } from '@/app/utils/toRub';
import { EAssetIds } from '@/constants/common';
import { useTranslation } from '@/app/hooks/useTranslation';
import { TbZoom as ZoomIcon } from 'react-icons/tb';
import cn from 'classnames';

type TProps = {
	id: EAssetIds;
	title: string;
	value: number;
	counts?: {
		[x: string]: number;
	}[];
	isPrimary?: boolean;
	isExpanded?: boolean;
	onToggle?: () => void;
};

export const AssetCard = ({
	id,
	title,
	value,
	counts,
	isPrimary,
	isExpanded,
	onToggle,
}: TProps) => {
	const t = useTranslation();

	const [tooltipText, setTooltipText] = useState<string>(t('clickToCopy'));

	useEffect(() => {
		const timerId = setTimeout(() => setTooltipText(t('clickToCopy')), 2000);

		return () => {
			clearTimeout(timerId);
		};
	}, [tooltipText, t]);

	return (
		<div className={cn(styles.card, { [styles.card__expanded]: isExpanded })}>
			<div className={styles.titleWrapper}>
				<p className={styles.title}>{title}</p>
				{!isPrimary && (
					<button
						className={cn(styles.expandBtn, {
							[styles.expandBtn__active]: isExpanded,
						})}
						title={t('expand')}
						onClick={onToggle}
					>
						<ZoomIcon />
					</button>
				)}
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
			{counts && <PrevValue id={id} value={value} counts={counts} />}
		</div>
	);
};
