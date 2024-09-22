import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tInvestApi } from '@/config/api';

export const store = configureStore({
	reducer: {
		[tInvestApi.reducerPath]: tInvestApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(tInvestApi.middleware),
});

setupListeners(store.dispatch);
