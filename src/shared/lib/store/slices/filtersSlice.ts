import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { EAssetId, ECandleInterval } from "shared/constants";

interface FilterState {
	[EAssetId.SHARES]: { interval: ECandleInterval };
	[EAssetId.BONDS]: { interval: ECandleInterval };
	[EAssetId.GOLD]: { interval: ECandleInterval };
}

const initialState: FilterState = {
	[EAssetId.SHARES]: { interval: ECandleInterval.YEAR },
	[EAssetId.BONDS]: { interval: ECandleInterval.YEAR },
	[EAssetId.GOLD]: { interval: ECandleInterval.YEAR },
};

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setSharesFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>,
		) {
			state[EAssetId.SHARES] = {
				...state[EAssetId.SHARES],
				...action.payload,
			};
		},
		setBondsFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>,
		) {
			state[EAssetId.BONDS] = { ...state[EAssetId.BONDS], ...action.payload };
		},
		setGoldFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>,
		) {
			state[EAssetId.GOLD] = { ...state[EAssetId.GOLD], ...action.payload };
		},
	},
});

export const { setSharesFilters, setBondsFilters, setGoldFilters } =
	filtersSlice.actions;

export const { reducer: filtersReducer } = filtersSlice;
