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
import {
	candleIntervals,
	EAssetIds,
	etfIds,
	sharesIds,
} from '@/constants/common';
import cn from 'classnames';
import { useGetCandleData } from '@/app/hooks/useGetCandleData';
import { RootState } from '@/config/store/store';
import {
	usePostTbruCandlesMutation,
	usePostTgldCandlesMutation,
	usePostTitrCandlesMutation,
	usePostTlcbCandlesMutation,
	usePostTmosCandlesMutation,
	usePostTpayCandlesMutation,
	usePostBeluCandlesMutation,
	usePostChmfCandlesMutation,
	usePostLkohCandlesMutation,
	usePostMagnCandlesMutation,
	usePostMgntCandlesMutation,
	usePostNlmkCandlesMutation,
	// usePostNovaCandlesMutation,
	usePostRosnCandlesMutation,
	usePostSberpCandlesMutation,
} from '@/config/api';
import { PrevValueSkeleton } from './PrevValueSkeleton';
import { useEffect } from 'react';
import { LineChart } from '../LineChart';

type TProps = {
	id: EAssetIds;
	value: number;
	counts: {
		[x: string]: number;
	}[];
	setTrend: (value: 'up' | 'down') => void;
};

const texts = {
	[candleIntervals.WEEK]: 'last week',
	[candleIntervals.MONTH]: 'last month',
	[candleIntervals.YEAR]: 'last year',
};

const fetchCallbacks = {
	[EAssetIds.ALL]: [{ id: '', fetch: () => {} }],
	[EAssetIds.SHARES]: [
		{ id: etfIds.TMOS, fetch: usePostTmosCandlesMutation },
		{ id: etfIds.TITR, fetch: usePostTitrCandlesMutation },
		{ id: sharesIds.BELU, fetch: usePostBeluCandlesMutation },
		{ id: sharesIds.CHMF, fetch: usePostChmfCandlesMutation },
		{ id: sharesIds.LKOH, fetch: usePostLkohCandlesMutation },
		{ id: sharesIds.MAGN, fetch: usePostMagnCandlesMutation },
		{ id: sharesIds.MGNT, fetch: usePostMgntCandlesMutation },
		{ id: sharesIds.NLMK, fetch: usePostNlmkCandlesMutation },
		// { id: sharesIds.NOVA, fetch: usePostNovaCandlesMutation },
		{ id: sharesIds.ROSN, fetch: usePostRosnCandlesMutation },
		{ id: sharesIds.SBERP, fetch: usePostSberpCandlesMutation },
	],
	[EAssetIds.BONDS]: [
		{ id: etfIds.TBRU, fetch: usePostTbruCandlesMutation },
		{ id: etfIds.TLCB, fetch: usePostTlcbCandlesMutation },
		{ id: etfIds.TPAY, fetch: usePostTpayCandlesMutation },
	],
	[EAssetIds.GOLD]: [{ id: etfIds.TGLD, fetch: usePostTgldCandlesMutation }],
};

const dispatchCallbacks = {
	[EAssetIds.ALL]: setAllFilters,
	[EAssetIds.SHARES]: setSharesFilters,
	[EAssetIds.BONDS]: setBondsFilters,
	[EAssetIds.GOLD]: setGoldFilters,
};

export const PrevValue = ({ id, value, counts, setTrend }: TProps) => {
	const dispatch = useDispatch();
	const filters = useSelector((state: RootState) => state.filters[id]);
	const { data, isLoading } = useGetCandleData(filters, fetchCallbacks[id]);

	const lastPricesResult = data.reduce<{ [key: string]: number }>(
		(acc, { data }) => {
			for (const monthName of Object.keys(data?.lastPrices || {})) {
				acc[monthName] = (acc[monthName] || 0) + data?.lastPrices[monthName];
			}

			return acc;
		},
		{}
	);

	const prevValue = data.reduce((acc, { id, data }) => {
		const countObject = counts.find((count) => count[id]);
		const countValue = countObject ? countObject[id] : 0;

		return acc + data?.lastPrice * countValue;
	}, 0);

	const diff = value - prevValue;

	const handleRangeClick = (interval: string) => () => {
		dispatch(dispatchCallbacks[id]({ interval }));
	};

	useEffect(() => {
		setTrend(diff > 0 ? 'up' : 'down');
	}, [diff, setTrend]);

	if (!prevValue) {
		return <PrevValueSkeleton />;
	}

	if (isLoading) {
		return <PrevValueSkeleton />;
	}

	return (
		<>
			<div className={styles.prevValue}>
				<div className={styles.text}>
					<span
						className={cn(styles.diff, {
							[styles.diff__negative]: value < prevValue,
						})}
					>{`${diff > 0 ? '+' : ''}${toRub(diff)}`}</span>
					{`to ${texts[filters.interval]}`}
					<div
						className={cn(styles.badge, {
							[styles.badge__negative]: value < prevValue,
						})}
					>
						{(diff > 0 ? '+' : '') +
							((diff / prevValue) * 100).toFixed(0) +
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

			<LineChart data={lastPricesResult} />
		</>
	);
};
