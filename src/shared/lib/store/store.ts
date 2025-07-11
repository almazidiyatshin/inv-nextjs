import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { commonApi, tInvestApi } from "shared/api";
import { allValuesIndicatorFiltersReducer, filtersReducer } from "./slices";

export const store = configureStore({
	reducer: {
		[tInvestApi.reducerPath]: tInvestApi.reducer,
		[commonApi.reducerPath]: commonApi.reducer,
		filters: filtersReducer,
		allValuesIndicatorFilters: allValuesIndicatorFiltersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(tInvestApi.middleware)
			.concat(commonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
