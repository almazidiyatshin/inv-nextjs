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
						acc[portfolioName] = assets.reduce((sum, { price, quantity }) => {
							return sum + price * quantity;
						}, 0);

						return acc;
					}, {})
				: {},
		[stableCommonAssets],
	);

	const labelsMap: Record<EAssetType, string> = useDeepCompareMemoize({
		[EAssetType.SHARE]: t("shares"),
		[EAssetType.BOND]: t("bonds"),
		[EAssetType.METAL]: t("gold"),
		[EAssetType.MONEY]: t("money"),
	});

	const commonDataSets = useMemo(
		() =>
			stableCommonAssets
				? Object.entries(stableCommonAssets).reduce<
						Record<keyof typeof stableCommonAssets, TDataSet[]>
					>((acc, [portfolioName, assets]) => {
						let colorIndex = 500;

						const result = assets.reduce<Record<string, TDataSet>>(
							(acc, { type, price, quantity }) => {
								const value =
									((price * quantity) / portfolioTotalSums[portfolioName]) *
									100;

								if (acc[type]) {
									acc[type] = {
										...acc[type],
										value: acc[type].value + value,
									};

									return acc;
								}

								acc[type] = {
									name: labelsMap[type],
									color: `teal.${colorIndex}`,
									value,
								};
								colorIndex -= 100;

								return acc;
							},
							{} as Record<EAssetType, TDataSet>,
						);

						acc[portfolioName] = Object.values(result);

						return acc;
					}, {})
				: {},
		[stableCommonAssets, portfolioTotalSums, labelsMap],
	);

	const dataSets: Record<TAllAssetsChartType, TDataSet[]> = {
		[EAllAssetsChartTypes.T]: tDataSet,
		...commonDataSets,
	};

	return {
		dataSet: dataSets[type],
		isLoading: isPortfolioLoading || isCommonAssetsLoading,
	};
};
