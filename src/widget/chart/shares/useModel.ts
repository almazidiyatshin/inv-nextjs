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
	ESharesChartTypes,
	type RootState,
	type TSharesChartType,
} from "shared/lib";
import type { TDataSet } from "./types";

export const useModel = () => {
	const t = useTranslations();
	const { data: tPortfolio, isLoading: isTPortfolioLoading } =
		useTInvestApi.postPortfolio();
	const { data: commonAssets = {}, isLoading: isCommonAssetsLoading } =
		useCommonApi.getAssets({ type: EAssetType.SHARE });
	const type = useSelector((state: RootState) => state.sharesChartFilters.type);

	const {
		allSharesSum = 0,
		otherSharesSum = 0,
		tmosSum = 0,
	} = tPortfolio || {};

	const otherTSharesPercent = (otherSharesSum / allSharesSum) * 100;
	const tmosPercent = (tmosSum / allSharesSum) * 100;

	const tDataSet = [
		{
			name: t("other"),
			value: otherTSharesPercent,
			color: "teal.500",
		},
		{ name: "TMOS", value: tmosPercent, color: "teal.400" },
	];

	const stableCommonAssets =
		useDeepCompareMemoize<TGetAssetsApiReturn>(commonAssets);

	const totalPortfolioShareSums = useMemo(
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
									(price * quantity) / totalPortfolioShareSums[portfolioName],
								color: `teal.${colorIndex}`,
							};

							colorIndex -= 100;
							return result;
						});

						return acc;
					}, {})
				: {},
		[stableCommonAssets, totalPortfolioShareSums],
	);

	const dataSets: Record<TSharesChartType, TDataSet[]> = {
		[ESharesChartTypes.T]: tDataSet,
		...commonDataSets,
	};

	return {
		dataSet: dataSets[type],
		isLoading: isTPortfolioLoading || isCommonAssetsLoading,
	};
};
