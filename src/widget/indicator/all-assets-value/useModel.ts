import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
	type TGetAssetsApiReturn,
	useCommonApi,
	useTInvestApi,
} from "shared/api";
import { useDeepCompareMemoize } from "shared/hooks";
import {
	EAllValuesIndicatorTypes,
	type RootState,
	type TAllValuesIndicatorType,
} from "shared/lib";

import { toRub } from "shared/utils";

export const useModel = () => {
	const { data: tInvestAssets, isLoading: isTInvestAssetsLoading } =
		useTInvestApi.postPortfolio();
	const { data: commonAssets = {}, isLoading: isCommonAssetsLoading } =
		useCommonApi.getAssets();
	const { data: usdExchangeRate = "", isLoading: isUsdExchangeRateLoading } =
		useCommonApi.getUsdExchangeRate();

	const type = useSelector(
		(state: RootState) => state.allValuesIndicatorFilters.type,
	);

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
				: undefined,
		[stableCommonAssets, usdExchangeRate],
	);

	const portfolioTotalSum = Object.values(portfolioTotalSums || {}).reduce(
		(acc, value) => {
			return acc + value;
		},
		0,
	);
	const { totalSum: tInvestTotalSum = 0 } = tInvestAssets || {};

	const valuesMap: Record<TAllValuesIndicatorType, number> = {
		[EAllValuesIndicatorTypes.ALL]: tInvestTotalSum + portfolioTotalSum,
		[EAllValuesIndicatorTypes.T]: tInvestTotalSum,
		...portfolioTotalSums,
	};

	const value = toRub(Number(valuesMap[type].toFixed(0)));

	return {
		value,
		isLoading:
			isTInvestAssetsLoading ||
			isCommonAssetsLoading ||
			isUsdExchangeRateLoading,
	};
};
