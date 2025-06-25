import type { SegmentGroupValueChangeDetails } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { EAssetId, ECandleInterval } from "shared/constants";
import { useTranslation } from "shared/lib";
import {
	setBondsFilters,
	setGoldFilters,
	setSharesFilters,
} from "shared/lib/store/slices";
import type { TAssetRangeFilterProps } from "./types";

const dispatchCallbacks = {
	[EAssetId.SHARES]: setSharesFilters,
	[EAssetId.BONDS]: setBondsFilters,
	[EAssetId.GOLD]: setGoldFilters,
};

export const useModel = ({ id }: Pick<TAssetRangeFilterProps, "id">) => {
	const t = useTranslation();
	const dispatch = useDispatch();

	const items = [
		{ label: t("1Y"), value: ECandleInterval.YEAR },
		{ label: t("5Y"), value: ECandleInterval.FIVE_YEARS },
		{ label: t("10Y"), value: ECandleInterval.TEN_YEARS },
	];

	const handleRangeClick = (details: SegmentGroupValueChangeDetails) => {
		const interval = details.value as ECandleInterval;
		dispatch(dispatchCallbacks[id]({ interval }));
	};

	return {
		items,
		handleRangeClick,
	};
};
