"use client";

import { fetchCallbacks } from "entity/asset/config";
import { useGetCandleData } from "entity/asset/hooks";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTInvestApi } from "shared/api";
import { EAssetId, ECandleInterval, etfIds } from "shared/constants";
import type { RootState } from "shared/lib";
import { toRub } from "shared/utils";

export const useModel = () => {
	const t = useTranslations();
	const locale = useLocale();
	const filters = useSelector(
		(state: RootState) => state.filters[EAssetId.T_BONDS],
	);
	const { data: portfolioData, isLoading: isPortfolioLoading } =
		useTInvestApi.postPortfolio();
	const { data: candlesData, isLoading: isCandlesLoading } = useGetCandleData(
		filters,
		fetchCallbacks[EAssetId.T_BONDS],
	);

	const { allBondsSum, tbruCount, tlcbCount, tofzCount } = portfolioData || {};

	const config = useMemo(
		() => ({
			title: t("allBondsValue"),
			value: allBondsSum,
			counts: [
				{ [etfIds.TBRU]: Number(tbruCount) },
				{ [etfIds.TLCB]: Number(tlcbCount) },
				{ [etfIds.TOFZ]: Number(tofzCount) },
			],
		}),
		[t, allBondsSum, tbruCount, tlcbCount, tofzCount],
	);

	const counts = config.counts;

	const texts = {
		[ECandleInterval.YEAR]: t("lastYear"),
		[ECandleInterval.FIVE_YEARS]: t("lastFiveYears"),
		[ECandleInterval.TEN_YEARS]: t("lastTenYears"),
	};

	const { prevValue, dataset } = useMemo(() => {
		const lastPrices = candlesData.reduce<{ [key: string]: number }>(
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
	}, [candlesData, locale, counts]);

	const value = config.value || 0;
	const diff = value - prevValue;
	const persent = `${(diff > 0 ? "+" : "") + ((diff / prevValue) * 100).toFixed(0)}%`;
	const description = `${diff > 0 ? "+" : ""}${toRub(diff)} ${t("to")} ${texts[filters.interval]}`;

	return {
		title: config.title,
		value,
		persent,
		description,
		isNegative: value < prevValue,
		isLoading: isPortfolioLoading || isCandlesLoading,
		dataset,
	};
};
