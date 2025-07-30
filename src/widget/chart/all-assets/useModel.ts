import { EAssetType } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
	type TGetAssetsApiReturn,
	useCommonApi,
	useTInvestApi,
} from "shared/api";
import { useDeepCompareMemoize } from "shared/hooks";
import {
	EAllAssetsChartTypes,
	type RootState,
	type TAllAssetsChartType,
} from "shared/lib";
import type { TDataSet } from "../shares/types";

export const useModel = () => {
	const t = useTranslations();
	const { data: portfolio, isLoading: isPortfolioLoading } =
		useTInvestApi.postPortfolio();
	const { data: commonAssets = {}, isLoading: isCommonAssetsLoading } =
		useCommonApi.getAssets();
	const { data: usdExchangeRate = "", isLoading: isUsdExchangeRateLoading } =
		useCommonApi.getUsdExchangeRate();

	const type = useSelector(
		(state: RootState) => state.allAssetsChartFilters.type,
	);

	const {
		allSharesSum = 0,
		allBondsSum = 0,
		totalSum = 0,
		goldSum = 0,
	} = portfolio || {};

	const allSharesPercent = (allSharesSum / totalSum) * 100;
	const allBondsPercent = (allBondsSum / totalSum) * 100;
	const goldPercent = (goldSum / totalSum) * 100;

	const tDataSet = [
		{ name: t("shares"), value: allSharesPercent, color: "teal.500" },
		{ name: t("bonds"), value: allBondsPercent, color: "teal.400" },
		{ name: t("gold"), value: goldPercent, color: "teal.300" },
	];

	const stableCommonAssets =
		useDeepCompareMemoize<TGetAssetsApiReturn>(commonAssets);

	const portfolioTotalSums = useMemo(
		() =>
			stableCommonAssets
				? Object.entries(stableCommonAssets).reduce<
						Record<keyof typeof stableCommonAssets, number>
					>((acc, [portfolioName, assets]) => {
						acc[portfolioName] = assets.reduce(
							(sum, { name, price, quantity }) => {
								return (
									sum +
									(name === "USD"
										? parseFloat(usdExchangeRate.replace(",", "."))
										: price) *
										quantity
								);
							},
							0,
						);

						return acc;
					}, {})
				: {},
		[stableCommonAssets, usdExchangeRate],
	);

	const commonDataSets = useMemo(
		() =>
			stableCommonAssets
				? Object.entries(stableCommonAssets).reduce<
						Record<keyof typeof stableCommonAssets, TDataSet[]>
					>((acc, [portfolioName, assets]) => {
						let colorIndex = 500;

						const result = assets.reduce<Record<string, TDataSet>>(
							(acc, { name, type, price, quantity }) => {
								const value =
									((price * quantity) / portfolioTotalSums[portfolioName]) *
									100;
								const key = type === EAssetType.MONEY ? name : type;

								if (acc[key]) {
									acc[type] = {
										...acc[type],
										value: acc[type].value + value,
									};

									return acc;
								}

								acc[key] = {
									name: key,
									color: `teal.${colorIndex}`,
									value,
								};
								colorIndex -= 100;

								return acc;
							},
							{} as Record<EAssetType, TDataSet>,
						);

						console.log({ result });

						acc[portfolioName] = Object.values(result);

						return acc;
					}, {})
				: {},
		[stableCommonAssets, portfolioTotalSums],
	);

	const dataSets: Record<TAllAssetsChartType, TDataSet[]> = {
		[EAllAssetsChartTypes.T]: tDataSet,
		...commonDataSets,
	};

	return {
		dataSet: dataSets[type],
		isLoading:
			isPortfolioLoading || isCommonAssetsLoading || isUsdExchangeRateLoading,
	};
};
