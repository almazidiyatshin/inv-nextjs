import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EAssetIds, ECandleInterval } from 'shared/constants';

interface FilterState {
	[EAssetIds.SHARES]: { interval: ECandleInterval };
	[EAssetIds.BONDS]: { interval: ECandleInterval };
	[EAssetIds.GOLD]: { interval: ECandleInterval };
}

const initialState: FilterState = {
	[EAssetIds.SHARES]: { interval: ECandleInterval.YEAR },
	[EAssetIds.BONDS]: { interval: ECandleInterval.YEAR },
	[EAssetIds.GOLD]: { interval: ECandleInterval.YEAR },
};

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
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

export const { setSharesFilters, setBondsFilters, setGoldFilters } =
	filtersSlice.actions;

export const { reducer: filtersReducer } = filtersSlice;
