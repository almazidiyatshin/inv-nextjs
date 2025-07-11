import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export enum EAllValuesIndicatorTypes {
	ALL = "all",
	T = "T",
}

export type TAllValuesIndicatorType = EAllValuesIndicatorTypes | (string & {});

type TFilterState = {
	type: TAllValuesIndicatorType;
};

const initialState: TFilterState = {
	type: EAllValuesIndicatorTypes.ALL,
};

const allValuesIndicatorFiltersSlice = createSlice({
	name: "allValuesIndicatorFilters",
	initialState,
	reducers: {
		setAllValuesIndicatorFilter(
			state,
			action: PayloadAction<{ type: TAllValuesIndicatorType }>,
		) {
			state.type = action.payload.type;
		},
	},
});

export const { setAllValuesIndicatorFilter } =
	allValuesIndicatorFiltersSlice.actions;

export const { reducer: allValuesIndicatorFiltersReducer } =
	allValuesIndicatorFiltersSlice;
