import type { MenuSelectionDetails } from "@chakra-ui/react";
import { EAssetType } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { useCommonApi } from "shared/api";
import {
	EBondsChartTypes,
	type RootState,
	setBondsChartFilter,
} from "shared/lib";

export const useModel = () => {
	const dispatch = useDispatch();
	const t = useTranslations();
	const { data: commonAssets } = useCommonApi.getAssets({
		type: EAssetType.BOND,
	});
	const type = useSelector((state: RootState) => state.bondsChartFilters.type);

	const baseOptions = [
		{ name: `T ${t("bonds").toLowerCase()}`, value: EBondsChartTypes.T },
	];
	const commonOptions = Object.entries(commonAssets || {}).map(
		([portfolioName]) => ({
			name: `${portfolioName} ${t("bonds").toLowerCase()}`,
			value: portfolioName,
		}),
	);
	const options = [...baseOptions, ...commonOptions];

	const handleSelect = (item: MenuSelectionDetails) => {
		dispatch(
			setBondsChartFilter({
				type: item.value,
			}),
		);
	};

	return {
		title: `${type} ${t("bonds").toLowerCase()} ${t("statistics").toLowerCase()}`,
		options,
		currentType: type,
		handleSelect,
	};
};
