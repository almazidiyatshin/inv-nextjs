'use client';

import { useEffect, useState } from 'react';
import { TbCopy as CopyIcon } from 'react-icons/tb';
import styles from './styles.module.css';
import { PrevValue } from './components/PrevValue';
import { toRub } from '@/app/utils/toRub';
import { EAssetIds } from '@/constants/common';
import { useTranslation } from '@/app/hooks/useTranslation';
import { TbZoomIn as ZoomIconIn } from 'react-icons/tb';
import { TbZoomOut as ZoomIconOut } from 'react-icons/tb';
import cn from 'classnames';

type TProps = {
	id: EAssetIds;
	title: string;
	value: number;
	counts?: {
		[x: string]: number;
	}[];
	isExpanded?: boolean;
	onToggle?: () => void;
};

export const AssetCard = ({
	id,
	title,
	value,
	counts,
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
				<button
					className={cn(styles.expandBtn, {
						[styles.expandBtn__active]: isExpanded,
					})}
					title={t('expand')}
					onClick={onToggle}
				>
					{isExpanded ? <ZoomIconOut /> : <ZoomIconIn />}
				</button>
			</div>
			<div
				className={styles.value}
				onClick={() => {
					const rawValue = value.toFixed();
					navigator.clipboard.writeText(rawValue);
					setTooltipText(t('copied'));
				}}
			>
				<div className={styles.tooltip}>
					{tooltipText}
					{tooltipText === t('clickToCopy') && <CopyIcon />}
				</div>
				<p>{toRub(value)}</p>
			</div>
			{counts && <PrevValue id={id} value={value} counts={counts} />}
		</div>
	);
};
