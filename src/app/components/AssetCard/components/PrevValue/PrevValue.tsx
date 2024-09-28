'use client';

import { toRub } from '@/app/utils/toRub';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	setAllFilters,
	setBondsFilters,
	setGoldFilters,
	setSharesFilters,
} from '@/config/store/slices/filtersSlice';
import { candleIntervals, EAssetIds } from '@/constants/common';
import cn from 'classnames';
import { useGetCandleData } from '@/app/hooks/useGetCandleData';
import { RootState } from '@/config/store/store';
import { usePostTgldCandlesMutation } from '@/config/api/tInvestApi';
import { PrevValueSkeleton } from './PrevValueSkeleton';

type TProps = {
	id: EAssetIds;
	value: number;
	count: number;
};

const texts = {
	[candleIntervals.WEEK]: 'last week',
	[candleIntervals.MONTH]: 'last month',
	[candleIntervals.YEAR]: 'last year',
};

const fetchCallbacks = {
	[EAssetIds.ALL]: () => {},
	[EAssetIds.SHARES]: () => {},
	[EAssetIds.BONDS]: () => {},
	[EAssetIds.GOLD]: usePostTgldCandlesMutation,
};

const dispatchCallbacks = {
	[EAssetIds.ALL]: setAllFilters,
	[EAssetIds.SHARES]: setSharesFilters,
	[EAssetIds.BONDS]: setBondsFilters,
	[EAssetIds.GOLD]: setGoldFilters,
};

export const PrevValue = ({ id, value, count }: TProps) => {
	const dispatch = useDispatch();
	const filters = useSelector((state: RootState) => state.filters[id]);
	const { data, isLoading } = useGetCandleData(filters, fetchCallbacks[id]);
	const prevValue = data * count;

	const handleRangeClick = (interval: string) => () => {
		dispatch(dispatchCallbacks[id]({ interval }));
	};

	if (!prevValue) {
		return <PrevValueSkeleton />;
	}

	if (isLoading) {
		return <PrevValueSkeleton />;
	}

	return (
		<div className={styles.prevValue}>
			<div className={styles.text}>
				{`${toRub(prevValue)} ${texts[filters.interval]}`}
				<div className={styles.badge}>
					{(value > prevValue ? '+' : '-') +
						(((value - prevValue) / prevValue) * 100).toFixed(0) +
						'%'}
				</div>
			</div>

			<div className={styles.btns}>
				<button
					className={cn(styles.btn, {
						[styles.btn__active]: filters.interval === candleIntervals.WEEK,
					})}
					title="Week"
					onClick={handleRangeClick(candleIntervals.WEEK)}
				>
					Week
				</button>
				<button
					className={cn(styles.btn, {
						[styles.btn__active]: filters.interval === candleIntervals.MONTH,
					})}
					title="Month"
					onClick={handleRangeClick(candleIntervals.MONTH)}
				>
					Month
				</button>
				<button
					className={cn(styles.btn, {
						[styles.btn__active]: filters.interval === candleIntervals.YEAR,
					})}
					title="Year"
					onClick={handleRangeClick(candleIntervals.YEAR)}
				>
					Year
				</button>
			</div>
		</div>
	);
};
