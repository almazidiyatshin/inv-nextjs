import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export enum EAllAssetsChartTypes {
	T = "T",
}

export type TAllAssetsChartType = EAllAssetsChartTypes | (string & {});

type TFilterState = {
	type: TAllAssetsChartType;
};

const initialState: TFilterState = {
	type: EAllAssetsChartTypes.T,
};

const allAssetsChartFiltersSlice = createSlice({
	name: "allAssetsChartFilters",
	initialState,
	reducers: {
		setAllAssetsChartFilter(
			state,
			action: PayloadAction<{ type: TAllAssetsChartType }>,
		) {
			state.type = action.payload.type;
		},
	},
});

export const { setAllAssetsChartFilter } = allAssetsChartFiltersSlice.actions;

export const { reducer: allAssetsChartReducer } = allAssetsChartFiltersSlice;
