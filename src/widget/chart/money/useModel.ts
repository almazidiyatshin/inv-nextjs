import { EAssetType } from "@prisma/client";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { type TGetAssetsApiReturn, useCommonApi } from "shared/api";
import { useDeepCompareMemoize } from "shared/hooks";
import type { RootState, TMoneyChartType } from "shared/lib";
import type { TDataSet } from "../shares/types";

export const useModel = () => {
	const { data: commonAssets = {}, isLoading: isCommonAssetsLoading } =
		useCommonApi.getAssets({ type: EAssetType.MONEY });
	const { data: usdExchangeRate = "", isLoading: isUsdExchangeRateLoading } =
		useCommonApi.getUsdExchangeRate();

	const type = useSelector((state: RootState) => state.moneyChartFilters.type);

	const stableCommonAssets =
		useDeepCompareMemoize<TGetAssetsApiReturn>(commonAssets);

	const portfolioMoneyTotalSums = useMemo(
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
						acc[portfolioName] = assets.map(({ name, price, quantity }) => {
							const result = {
								name: name,
								value:
									((price * quantity) /
										portfolioMoneyTotalSums[portfolioName]) *
									100,
								color: `teal.${colorIndex}`,
							};

							colorIndex -= 100;
							return result;
						});

						return acc;
					}, {})
				: {},
		[stableCommonAssets, portfolioMoneyTotalSums],
	);

	const dataSets: Record<TMoneyChartType, TDataSet[]> = {
		...commonDataSets,
	};

	const keys = Object.keys(dataSets);

	return {
		dataSet: type ? dataSets[type] : dataSets[keys[0]],
		isLoading: isCommonAssetsLoading || isUsdExchangeRateLoading,
	};
};
