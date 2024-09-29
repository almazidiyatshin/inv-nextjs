import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cbApi, tInvestApi } from '@/config/api';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
	reducer: {
		[tInvestApi.reducerPath]: tInvestApi.reducer,
		[cbApi.reducerPath]: cbApi.reducer,
		filters: filtersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(tInvestApi.middleware)
			.concat(cbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
