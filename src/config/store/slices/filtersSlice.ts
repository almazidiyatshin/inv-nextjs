import { candleIntervals, EAssetIds } from '@/constants/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
	[EAssetIds.ALL]: { interval: string };
	[EAssetIds.SHARES]: { interval: string };
	[EAssetIds.BONDS]: { interval: string };
	[EAssetIds.GOLD]: { interval: string };
}

const initialState: FilterState = {
	[EAssetIds.ALL]: { interval: candleIntervals.YEAR },
	[EAssetIds.SHARES]: { interval: candleIntervals.YEAR },
	[EAssetIds.BONDS]: { interval: candleIntervals.YEAR },
	[EAssetIds.GOLD]: { interval: candleIntervals.YEAR },
};

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setAllFilters(state, action: PayloadAction<{ interval: string }>) {
			state[EAssetIds.ALL] = { ...state[EAssetIds.ALL], ...action.payload };
		},
		setSharesFilters(state, action: PayloadAction<{ interval: string }>) {
			state[EAssetIds.SHARES] = {
				...state[EAssetIds.SHARES],
				...action.payload,
			};
		},
		setBondsFilters(state, action: PayloadAction<{ interval: string }>) {
			state[EAssetIds.BONDS] = { ...state[EAssetIds.BONDS], ...action.payload };
		},
		setGoldFilters(state, action: PayloadAction<{ interval: string }>) {
			state[EAssetIds.GOLD] = { ...state[EAssetIds.GOLD], ...action.payload };
		},
	},
});

export const {
	setAllFilters,
	setSharesFilters,
	setBondsFilters,
	setGoldFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
