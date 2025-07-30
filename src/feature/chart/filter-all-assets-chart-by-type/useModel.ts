import type { MenuSelectionDetails } from "@chakra-ui/react";
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
	const commonOptions = Object.entries(commonAssets || {}).map(
		([portfolioName]) => ({
			name: `${portfolioName}`,
			value: portfolioName,
		}),
	);
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
