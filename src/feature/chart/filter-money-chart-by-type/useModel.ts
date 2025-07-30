import type { MenuSelectionDetails } from "@chakra-ui/react";
import { EAssetType } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { useCommonApi } from "shared/api";
import { type RootState, setMoneyChartFilter } from "shared/lib";

export const useModel = () => {
	const t = useTranslations();
	const dispatch = useDispatch();
	const { data: commonAssets } = useCommonApi.getAssets({
		type: EAssetType.MONEY,
	});
	const type = useSelector((state: RootState) => state.moneyChartFilters.type);

	const commonOptions = Object.entries(commonAssets || {}).map(
		([portfolioName]) => ({
			name: `${portfolioName}`,
			value: portfolioName,
		}),
	);
	const options = [...commonOptions];

	const handleSelect = (item: MenuSelectionDetails) => {
		dispatch(
			setMoneyChartFilter({
				type: item.value,
			}),
		);
	};

	return {
		title: `${type || options[0]?.name} ${t("money").toLowerCase()} ${t("statistics")}`,
		options,
		currentType: type,
		handleSelect,
	};
};
