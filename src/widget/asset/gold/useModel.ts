import { fetchCallbacks } from "entity/asset/config";
import { useGetCandleData } from "entity/asset/hooks";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTInvestApi } from "shared/api";
import {
	EAssetId,
	ECandleInterval,
	etfIds,
	LS_LOCALE_KEY,
} from "shared/constants";
import { type RootState, useTranslation } from "shared/lib";
import { toRub } from "shared/utils";

export const useModel = () => {
	const t = useTranslation();
	const filters = useSelector(
		(state: RootState) => state.filters[EAssetId.T_GOLD],
	);
	const { data: portfolioData, isLoading: isPortfolioLoading } =
		useTInvestApi.postPortfolio();
	const { data: candlesData, isLoading: isCandlesLoading } = useGetCandleData(
		filters,
		fetchCallbacks[EAssetId.T_GOLD],
	);
	const locale = localStorage.getItem(LS_LOCALE_KEY) || "en";

	const { goldSum, tgldCount } = portfolioData || {};

	const config = useMemo(
		() => ({
			title: t("goldValue"),
			value: goldSum,
			counts: [{ [etfIds.TGLD]: Number(tgldCount) }],
		}),
		[t, goldSum, tgldCount],
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
