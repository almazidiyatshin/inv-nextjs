import type { MenuSelectionDetails } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useCommonApi } from "shared/api";
import {
	EAllValuesIndicatorTypes,
	type RootState,
	setAllValuesIndicatorFilter,
} from "shared/lib";

export const useModel = () => {
	const dispatch = useDispatch();
	const { data: commonAssets } = useCommonApi.getAssets();
	const type = useSelector(
		(state: RootState) => state.allValuesIndicatorFilters.type,
	);

	const baseOptions = [
		{ name: "All assets", value: EAllValuesIndicatorTypes.ALL },
		{ name: "T assets", value: EAllValuesIndicatorTypes.T },
	];
	const commonOptions = Object.entries(commonAssets || {}).map(
		([portfolioName]) => ({
			name: `${portfolioName} assets`,
			value: portfolioName,
		}),
	);
	const options = [...baseOptions, ...commonOptions];

	const handleSelect = (item: MenuSelectionDetails) => {
		dispatch(
			setAllValuesIndicatorFilter({
				type: item.value,
			}),
		);
	};

	return { options, currentType: type, handleSelect };
};
