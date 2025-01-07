import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tInvestApi } from '@/config/api';
import filtersReducer from './slices/filtersSlice';
import { commonApi } from '../api/commonApi/commonApi';

export const store = configureStore({
	reducer: {
		[tInvestApi.reducerPath]: tInvestApi.reducer,
		[commonApi.reducerPath]: commonApi.reducer,
		filters: filtersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(tInvestApi.middleware)
			.concat(commonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
