import type { MenuSelectionDetails } from "@chakra-ui/react";
import { EAssetType } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { useCommonApi } from "shared/api";
import {
	EAllAssetsChartTypes,
	type RootState,
	setAllAssetsChartFilter,
} from "shared/lib";

export const useModel = () => {
	const dispatch = useDispatch();
	const t = useTranslations();
	const { data: commonAssets } = useCommonApi.getAssets();

	const type = useSelector(
		(state: RootState) => state.allAssetsChartFilters.type,
	);

	const baseOptions = [
		{
			name: "T",
			value: EAllAssetsChartTypes.T,
		},
	];
	const commonOptions = Object.entries(commonAssets || {}).reduce<
		{ name: string; value: string }[]
	>((acc, [portfolioName, assets]) => {
		if (assets[0].type !== EAssetType.MONEY) {
			acc.push({
				name: `${portfolioName}`,
				value: portfolioName,
			});
		}

		return acc;
	}, []);
	const options = [...baseOptions, ...commonOptions];

	const handleSelect = (item: MenuSelectionDetails) => {
		dispatch(
			setAllAssetsChartFilter({
				type: item.value,
			}),
		);
	};

	return {
		title: `${type} ${t("allAssetsValue").toLowerCase()}`,
		options,
		currentType: type,
		handleSelect,
	};
};
