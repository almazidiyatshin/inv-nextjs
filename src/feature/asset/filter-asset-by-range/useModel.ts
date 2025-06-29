import type { SegmentGroupValueChangeDetails } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { EAssetId, ECandleInterval } from "shared/constants";
import { useTranslation } from "shared/lib";
import {
	setTBondsFilters,
	setTGoldFilters,
	setTSharesFilters,
} from "shared/lib/store/slices";
import type { TAssetRangeFilterProps } from "./types";

const dispatchCallbacks = {
	[EAssetId.T_SHARES]: setTSharesFilters,
	[EAssetId.T_BONDS]: setTBondsFilters,
	[EAssetId.T_GOLD]: setTGoldFilters,
	[EAssetId.VTB_SHARES]: setTSharesFilters,
	[EAssetId.VTB_BONDS]: setTBondsFilters,
	[EAssetId.VTB_GOLD]: setTGoldFilters,
	[EAssetId.SBER_SHARES]: setTSharesFilters,
	[EAssetId.SBER_BONDS]: setTBondsFilters,
	[EAssetId.SBER_GOLD]: setTGoldFilters,
};

export const useModel = ({ id }: Pick<TAssetRangeFilterProps, "id">) => {
	const t = useTranslation();
	const dispatch = useDispatch();

	const items = [
		{ label: t("year"), value: ECandleInterval.YEAR },
		{ label: t("fiveYears"), value: ECandleInterval.FIVE_YEARS },
		{ label: t("tenYears"), value: ECandleInterval.TEN_YEARS },
	];

	const texts = {
		label: t("byRange"),
	};

	const handleChange = (details: SegmentGroupValueChangeDetails) => {
		const interval = details.value as ECandleInterval;
		dispatch(dispatchCallbacks[id]({ interval }));
	};

	return {
		texts,
		items,
		handleChange,
	};
};
