import { EAssetType } from "@prisma/client";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
	type TGetAssetsApiReturn,
	useCommonApi,
	useTInvestApi,
} from "shared/api";
import { useDeepCompareMemoize } from "shared/hooks";
import {
	EBondsChartTypes,
	type RootState,
	type TBondsChartType,
} from "shared/lib";
import type { TDataSet } from "../shares/types";

export const useModel = () => {
	const { data: portfolio, isLoading: isPortfolioLoading } =
		useTInvestApi.postPortfolio();
	const { data: commonAssets = {}, isLoading: isCommonAssetsLoading } =
		useCommonApi.getAssets({ type: EAssetType.BOND });
	const type = useSelector((state: RootState) => state.bondsChartFilters.type);

	const {
		tbruSum = 0,
		allBondsSum = 0,
		tlcbSum = 0,
		tofzSum = 0,
	} = portfolio || {};

	const tbruPercent = (tbruSum / allBondsSum) * 100;
	const tlcbPercent = (tlcbSum / allBondsSum) * 100;
	const tofzPercent = (tofzSum / allBondsSum) * 100;

	const tDataSet = [
		{ name: "TBRU", value: tbruPercent, color: "teal.500" },
		{ name: "TLCB", value: tlcbPercent, color: "teal.400" },
		{ name: "TOFZ", value: tofzPercent, color: "teal.300" },
	];

	const stableCommonAssets =
		useDeepCompareMemoize<TGetAssetsApiReturn>(commonAssets);

	const totalPortfolioBondsSums = useMemo(
		() =>
			stableCommonAssets
				? Object.entries(stableCommonAssets).reduce<
						Record<keyof typeof stableCommonAssets, number>
					>((acc, [portfolioName, assets]) => {
						acc[portfolioName] = assets.reduce((sum, { price, quantity }) => {
							return sum + price * quantity;
						}, 0);

						return acc;
					}, {})
				: {},
		[stableCommonAssets],
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
									(price * quantity) / totalPortfolioBondsSums[portfolioName],
								color: `teal.${colorIndex}`,
							};

							colorIndex -= 100;
							return result;
						});

						return acc;
					}, {})
				: {},
		[stableCommonAssets, totalPortfolioBondsSums],
	);

	const dataSets: Record<TBondsChartType, TDataSet[]> = {
		[EBondsChartTypes.T]: tDataSet,
		...commonDataSets,
	};

	return {
		dataSet: dataSets[type],
		isLoading: isPortfolioLoading || isCommonAssetsLoading,
	};
};
