import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export enum ESharesChartTypes {
	T = "T",
}

export type TSharesChartType = ESharesChartTypes | (string & {});

type TFilterState = {
	type: TSharesChartType;
};

const initialState: TFilterState = {
	type: ESharesChartTypes.T,
};

const sharesChartFiltersSlice = createSlice({
	name: "sharesChartFilters",
	initialState,
	reducers: {
		setSharesChartFilter(
			state,
			action: PayloadAction<{ type: TSharesChartType }>,
		) {
			state.type = action.payload.type;
		},
	},
});

export const { setSharesChartFilter } = sharesChartFiltersSlice.actions;

export const { reducer: sharesChartReducer } = sharesChartFiltersSlice;
