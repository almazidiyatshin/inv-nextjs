import { useDispatch, useSelector } from "react-redux";
import { EAssetId, ECandleInterval } from "shared/constants";
import { type RootState, useTranslation } from "shared/lib";
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
	const filters = useSelector((state: RootState) => state.filters[id]);

	const yearLabel = t("1Y");
	const fiveYearsLabel = t("5Y");
	const tenYearsLabel = t("10Y");

	const yearButtonTitle = t("year");
	const fiveYearsButtonTitle = t("fiveYears");
	const tenYearsButtonTitle = t("tenYears");

	const yearButtonType =
		filters.interval === ECandleInterval.YEAR
			? ("outline" as const)
			: ("ghost" as const);
	const fiveYearsButtonType =
		filters.interval === ECandleInterval.FIVE_YEARS
			? ("outline" as const)
			: ("ghost" as const);
	const tenYearsButtonType =
		filters.interval === ECandleInterval.TEN_YEARS
			? ("outline" as const)
			: ("ghost" as const);

	const handleRangeClick = (interval: ECandleInterval) => () => {
		dispatch(dispatchCallbacks[id]({ interval }));
	};

	return {
		yearLabel,
		fiveYearsLabel,
		tenYearsLabel,
		yearButtonTitle,
		fiveYearsButtonTitle,
		tenYearsButtonTitle,
		yearButtonType,
		fiveYearsButtonType,
		tenYearsButtonType,
		handleRangeClick,
	};
};
