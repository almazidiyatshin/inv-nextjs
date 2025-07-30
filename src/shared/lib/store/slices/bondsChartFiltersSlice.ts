import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export enum EBondsChartTypes {
	T = "T",
}

export type TBondsChartType = EBondsChartTypes | (string & {});

type TFilterState = {
	type: TBondsChartType;
};

const initialState: TFilterState = {
	type: EBondsChartTypes.T,
};

const bondsChartFiltersSlice = createSlice({
	name: "bondsChartFilters",
	initialState,
	reducers: {
		setBondsChartFilter(
			state,
			action: PayloadAction<{ type: TBondsChartType }>,
		) {
			state.type = action.payload.type;
		},
	},
});

export const { setBondsChartFilter } = bondsChartFiltersSlice.actions;

export const { reducer: bondsChartReducer } = bondsChartFiltersSlice;
