import { ECandleInterval, EAssetIds } from '@/constants/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
	[EAssetIds.ALL]: { interval: ECandleInterval };
	[EAssetIds.SHARES]: { interval: ECandleInterval };
	[EAssetIds.BONDS]: { interval: ECandleInterval };
	[EAssetIds.GOLD]: { interval: ECandleInterval };
}

const initialState: FilterState = {
	[EAssetIds.ALL]: { interval: ECandleInterval.YEAR },
	[EAssetIds.SHARES]: { interval: ECandleInterval.YEAR },
	[EAssetIds.BONDS]: { interval: ECandleInterval.YEAR },
	[EAssetIds.GOLD]: { interval: ECandleInterval.YEAR },
};

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setAllFilters(state, action: PayloadAction<{ interval: ECandleInterval }>) {
			state[EAssetIds.ALL] = { ...state[EAssetIds.ALL], ...action.payload };
		},
		setSharesFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>
		) {
			state[EAssetIds.SHARES] = {
				...state[EAssetIds.SHARES],
				...action.payload,
			};
		},
		setBondsFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>
		) {
			state[EAssetIds.BONDS] = { ...state[EAssetIds.BONDS], ...action.payload };
		},
		setGoldFilters(
			state,
			action: PayloadAction<{ interval: ECandleInterval }>
		) {
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
