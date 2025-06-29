import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { EAssetId, ECandleInterval, EValueType } from "shared/constants";

interface FilterState {
	[EAssetId.T_SHARES]: { interval: ECandleInterval; value: EValueType };
	[EAssetId.T_BONDS]: { interval: ECandleInterval; value: EValueType };
	[EAssetId.T_GOLD]: { interval: ECandleInterval; value: EValueType };
	[EAssetId.VTB_SHARES]: { interval: ECandleInterval; value: EValueType };
	[EAssetId.VTB_BONDS]: { interval: ECandleInterval; value: EValueType };
	[EAssetId.VTB_GOLD]: { interval: ECandleInterval; value: EValueType };
	[EAssetId.SBER_SHARES]: { interval: ECandleInterval; value: EValueType };
	[EAssetId.SBER_BONDS]: { interval: ECandleInterval; value: EValueType };
	[EAssetId.SBER_GOLD]: { interval: ECandleInterval; value: EValueType };
}

const initialState: FilterState = {
	[EAssetId.T_SHARES]: {
		interval: ECandleInterval.YEAR,
		value: EValueType.ASSET,
	},
	[EAssetId.T_BONDS]: {
		interval: ECandleInterval.YEAR,
		value: EValueType.ASSET,
	},
	[EAssetId.T_GOLD]: {
		interval: ECandleInterval.YEAR,
		value: EValueType.ASSET,
	},
	[EAssetId.VTB_SHARES]: {
		interval: ECandleInterval.YEAR,
		value: EValueType.ASSET,
	},
	[EAssetId.VTB_BONDS]: {
		interval: ECandleInterval.YEAR,
		value: EValueType.ASSET,
	},
	[EAssetId.VTB_GOLD]: {
		interval: ECandleInterval.YEAR,
		value: EValueType.ASSET,
	},
	[EAssetId.SBER_SHARES]: {
		interval: ECandleInterval.YEAR,
		value: EValueType.ASSET,
	},
	[EAssetId.SBER_BONDS]: {
		interval: ECandleInterval.YEAR,
		value: EValueType.ASSET,
	},
	[EAssetId.SBER_GOLD]: {
		interval: ECandleInterval.YEAR,
		value: EValueType.ASSET,
	},
};

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setTSharesFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>,
		) {
			state[EAssetId.T_SHARES] = {
				...state[EAssetId.T_SHARES],
				...action.payload,
			};
		},
		setTBondsFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>,
		) {
			state[EAssetId.T_BONDS] = {
				...state[EAssetId.T_BONDS],
				...action.payload,
			};
		},
		setTGoldFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>,
		) {
			state[EAssetId.T_GOLD] = { ...state[EAssetId.T_GOLD], ...action.payload };
		},
		setVtbSharesFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>,
		) {
			state[EAssetId.VTB_SHARES] = {
				...state[EAssetId.VTB_SHARES],
				...action.payload,
			};
		},
		setVtbBondsFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>,
		) {
			state[EAssetId.VTB_BONDS] = {
				...state[EAssetId.VTB_BONDS],
				...action.payload,
			};
		},
		setVtbGoldFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>,
		) {
			state[EAssetId.VTB_GOLD] = {
				...state[EAssetId.VTB_GOLD],
				...action.payload,
			};
		},
		setSberSharesFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>,
		) {
			state[EAssetId.SBER_SHARES] = {
				...state[EAssetId.SBER_SHARES],
				...action.payload,
			};
		},
		setSberBondsFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>,
		) {
			state[EAssetId.SBER_BONDS] = {
				...state[EAssetId.SBER_BONDS],
				...action.payload,
			};
		},
		setSberGoldFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>,
		) {
			state[EAssetId.SBER_GOLD] = {
				...state[EAssetId.SBER_GOLD],
				...action.payload,
			};
		},
	},
});

export const { setTSharesFilters, setTBondsFilters, setTGoldFilters } =
	filtersSlice.actions;

export const { reducer: filtersReducer } = filtersSlice;
