import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TMoneyChartType = string;

type TFilterState = {
	type: TMoneyChartType;
};

const initialState: TFilterState = {
	type: "",
};

const moneyChartFiltersSlice = createSlice({
	name: "moneyChartFilters",
	initialState,
	reducers: {
		setMoneyChartFilter(
			state,
			action: PayloadAction<{ type: TMoneyChartType }>,
		) {
			state.type = action.payload.type;
		},
	},
});

export const { setMoneyChartFilter } = moneyChartFiltersSlice.actions;

export const { reducer: moneyChartReducer } = moneyChartFiltersSlice;
