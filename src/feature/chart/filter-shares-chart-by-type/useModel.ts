import type { MenuSelectionDetails } from "@chakra-ui/react";
import { EAssetType } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { useCommonApi } from "shared/api";
import {
	ESharesChartTypes,
	type RootState,
	setSharesChartFilter,
} from "shared/lib";

export const useModel = () => {
	const dispatch = useDispatch();
	const t = useTranslations();
	const { data: commonAssets } = useCommonApi.getAssets({
		type: EAssetType.SHARE,
	});
	const type = useSelector((state: RootState) => state.sharesChartFilters.type);

	const baseOptions = [
		{ name: `T ${t("shares").toLowerCase()}`, value: ESharesChartTypes.T },
	];
	const commonOptions = Object.entries(commonAssets || {}).map(
		([portfolioName]) => ({
			name: `${portfolioName} ${t("shares").toLowerCase()}`,
			value: portfolioName,
		}),
	);
	const options = [...baseOptions, ...commonOptions];

	const handleSelect = (item: MenuSelectionDetails) => {
		dispatch(
			setSharesChartFilter({
				type: item.value,
			}),
		);
	};

	return {
		title: `${type} ${t("shares").toLowerCase()} ${t("statistics").toLowerCase()}`,
		options,
		currentType: type,
		handleSelect,
	};
};
