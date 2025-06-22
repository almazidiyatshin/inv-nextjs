import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTInvestApi } from "shared/api";
import {
	EAssetIds,
	ECandleInterval,
	etfIds,
	LS_LOCALE_KEY,
	sharesIds,
} from "shared/constants";
import { type RootState, useTranslation } from "shared/lib";
import {
	setBondsFilters,
	setGoldFilters,
	setSharesFilters,
} from "shared/lib/store/slices";
import { useGetCandleData } from "./hooks/useGetCandleData";
import type { TAssetCardProps } from "./types";

const fetchCallbacks = {
	[EAssetIds.SHARES]: [
		{ id: etfIds.TMOS, fetch: useTInvestApi.postTmos },
		{ id: sharesIds.BELU, fetch: useTInvestApi.postBelu },
		{ id: sharesIds.CHMF, fetch: useTInvestApi.postChmf },
		{ id: sharesIds.MAGN, fetch: useTInvestApi.postMagn },
		{ id: sharesIds.MGNT, fetch: useTInvestApi.postMgnt },
		{ id: sharesIds.NLMK, fetch: useTInvestApi.postNlmk },
	],
	[EAssetIds.BONDS]: [
		{ id: etfIds.TBRU, fetch: useTInvestApi.postTbru },
		{ id: etfIds.TLCB, fetch: useTInvestApi.postTlcb },
		{ id: etfIds.TOFZ, fetch: useTInvestApi.postTofz },
	],
	[EAssetIds.GOLD]: [{ id: etfIds.TGLD, fetch: useTInvestApi.postTgld }],
};

const dispatchCallbacks = {
	[EAssetIds.SHARES]: setSharesFilters,
	[EAssetIds.BONDS]: setBondsFilters,
	[EAssetIds.GOLD]: setGoldFilters,
};

export const useModel = ({
	id,
	value,
	counts,
}: Pick<TAssetCardProps, "id" | "value" | "counts">) => {
	const t = useTranslation();
	const dispatch = useDispatch();
	const filters = useSelector((state: RootState) => state.filters[id]);
	const { data, isLoading } = useGetCandleData(filters, fetchCallbacks[id]);
	const locale = localStorage.getItem(LS_LOCALE_KEY) || "en";

	const texts = {
		[ECandleInterval.YEAR]: t("lastYear"),
		[ECandleInterval.FIVE_YEARS]: t("lastFiveYears"),
		[ECandleInterval.TEN_YEARS]: t("lastTenYears"),
	};

	const { prevValue, dataset } = useMemo(() => {
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
			{},
		);

		const sorted = Object.entries(lastPrices).sort(
			([dateA], [dateB]) => Number(dateA) - Number(dateB),
		);

		const prevValue = sorted[0];

		return {
			dataset: sorted.map((item) => ({
				value: item[1],
				date: new Date(Number(item[0]))
					.toLocaleDateString(locale === "en" ? "en-US" : "ru-RU", {
						year: "numeric",
						month: "long",
					})
					.replace(" г.", ""),
			})),
			prevValue: prevValue?.[1] || 0,
		};
	}, [data, locale, counts]);

	const diff = value - prevValue;

	const handleRangeClick = (interval: ECandleInterval) => () => {
		dispatch(dispatchCallbacks[id]({ interval }));
	};

	return {
		prevValue,
		isLoading,
		diff,
		t,
		texts,
		filters,
		dataset,
		handleRangeClick,
	};
};
