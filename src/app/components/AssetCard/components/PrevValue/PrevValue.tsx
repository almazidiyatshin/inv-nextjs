'use client';

import { toRub } from '@/app/utils/toRub';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	setBondsFilters,
	setGoldFilters,
	setSharesFilters,
} from '@/config/store/slices/filtersSlice';
import {
	ECandleInterval,
	EAssetIds,
	etfIds,
	sharesIds,
	LS_LOCALE_KEY,
} from '@/constants/common';
import cn from 'classnames';
import { RootState } from '@/config/store/store';
import {
	usePostTbruCandlesMutation,
	usePostTgldCandlesMutation,
	usePostTitrCandlesMutation,
	usePostTlcbCandlesMutation,
	usePostTmosCandlesMutation,
	usePostTofzCandlesMutation,
	usePostBeluCandlesMutation,
	usePostChmfCandlesMutation,
	usePostMagnCandlesMutation,
	usePostMgntCandlesMutation,
	usePostNlmkCandlesMutation,
} from '@/config/api';
import { PrevValueSkeleton } from './PrevValueSkeleton';
import { useMemo } from 'react';
import { LineChart } from '../LineChart';
import { useGetCandleData } from '@/app/hooks/useGetCandleData';
import { useTranslation } from '@/app/hooks/useTranslation';

type TProps = {
	id: EAssetIds;
	value: number;
	counts: {
		[x: string]: number;
	}[];
};

const fetchCallbacks = {
	[EAssetIds.SHARES]: [
		{ id: etfIds.TMOS, fetch: usePostTmosCandlesMutation },
		{ id: etfIds.TITR, fetch: usePostTitrCandlesMutation },
		{ id: sharesIds.BELU, fetch: usePostBeluCandlesMutation },
		{ id: sharesIds.CHMF, fetch: usePostChmfCandlesMutation },
		{ id: sharesIds.MAGN, fetch: usePostMagnCandlesMutation },
		{ id: sharesIds.MGNT, fetch: usePostMgntCandlesMutation },
		{ id: sharesIds.NLMK, fetch: usePostNlmkCandlesMutation },
	],
	[EAssetIds.BONDS]: [
		{ id: etfIds.TBRU, fetch: usePostTbruCandlesMutation },
		{ id: etfIds.TLCB, fetch: usePostTlcbCandlesMutation },
		{ id: etfIds.TOFZ, fetch: usePostTofzCandlesMutation },
	],
	[EAssetIds.GOLD]: [{ id: etfIds.TGLD, fetch: usePostTgldCandlesMutation }],
};

const dispatchCallbacks = {
	[EAssetIds.SHARES]: setSharesFilters,
	[EAssetIds.BONDS]: setBondsFilters,
	[EAssetIds.GOLD]: setGoldFilters,
};

export const PrevValue = ({ id, value, counts }: TProps) => {
	const t = useTranslation();
	const dispatch = useDispatch();
	const filters = useSelector((state: RootState) => state.filters[id]);
	const { data, isLoading } = useGetCandleData(filters, fetchCallbacks[id]);
	const locale = localStorage.getItem(LS_LOCALE_KEY) || 'en';

	const texts = {
		[ECandleInterval.YEAR]: t('lastYear'),
		[ECandleInterval.FIVE_YEARS]: t('lastFiveYears'),
		[ECandleInterval.TEN_YEARS]: t('lastTenYears'),
	};

	const { prevValue, labels, dataset } = useMemo(() => {
		const lastPrices = data.reduce<{ [key: string]: number }>(
			(acc, { id, data }) => {
				const countObject = counts.find((count) => count[id]);
				const countValue = countObject ? countObject[id] : 0;

				for (const msDate of Object.keys(data?.lastPrices || {})) {
					acc[msDate] =
						(acc[msDate] || 0) + data?.lastPrices[msDate] * countValue;
				}

				return acc;
			},
			{}
		);

		const sorted = Object.entries(lastPrices).sort(
			([dateA], [dateB]) => Number(dateA) - Number(dateB)
		);

		const prevValue = sorted[0];

		return {
			labels: sorted.map((item) =>
				new Date(Number(item[0]))
					.toLocaleDateString(locale === 'en' ? 'en-US' : 'ru-RU', {
						year: 'numeric',
						month: 'long',
					})
					.replace(' г.', '')
			),
			dataset: sorted.map((item) => item[1]),
			prevValue: prevValue?.[1] || 0,
		};
	}, [data, locale, counts]);

	const diff = value - prevValue;

	console.log({ value, prevValue, diff });

	const handleRangeClick = (interval: ECandleInterval) => () => {
		dispatch(dispatchCallbacks[id]({ interval }));
	};

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
					{`${t('to')} ${texts[filters.interval]}`}
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
							[styles.btn__active]: filters.interval === ECandleInterval.YEAR,
						})}
						title={t('year')}
						onClick={handleRangeClick(ECandleInterval.YEAR)}
					>
						{t('1Y')}
					</button>

					<button
						className={cn(styles.btn, {
							[styles.btn__active]:
								filters.interval === ECandleInterval.FIVE_YEARS,
						})}
						title={t('fiveYears')}
						onClick={handleRangeClick(ECandleInterval.FIVE_YEARS)}
					>
						{t('5Y')}
					</button>

					<button
						className={cn(styles.btn, {
							[styles.btn__active]:
								filters.interval === ECandleInterval.TEN_YEARS,
						})}
						title={t('tenYears')}
						onClick={handleRangeClick(ECandleInterval.TEN_YEARS)}
					>
						{t('10Y')}
					</button>
				</div>
			</div>

			<LineChart labels={labels} dataset={dataset} />
		</>
	);
};
