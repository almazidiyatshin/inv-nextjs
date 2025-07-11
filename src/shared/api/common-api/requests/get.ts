import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type {
	TAppBaseQuery,
	TAppTagTypes,
	TGetAssetsApiReturn,
	TGetIndicatorsApiReturn,
	TGetMoexIndexApiReturn,
	TGetPortfoliosApiReturn,
	TGetUsdExchangeRateApiReturn,
} from "../types";

export const getRequests = (
	builder: EndpointBuilder<TAppBaseQuery, TAppTagTypes, "commonApi">,
) => ({
	getIndicators: builder.query<TGetIndicatorsApiReturn, void>({
		query: () => ({
			url: "/cbr/indicators",
		}),
	}),
	getMoexIndex: builder.query<TGetMoexIndexApiReturn, void>({
		query: () => ({ url: "/moexIndex" }),
	}),
	getPortfolios: builder.query<TGetPortfoliosApiReturn, void>({
		query: () => ({ url: "/portfolios" }),
		providesTags: ["Portfolio"],
	}),
	getAssets: builder.query<TGetAssetsApiReturn, void>({
		query: () => ({ url: "/assets" }),
		providesTags: ["Asset"],
	}),
	getUsdExchangeRate: builder.query<TGetUsdExchangeRateApiReturn, void>({
		query: () => ({
			url: "/cbr/exchangeRate",
		}),
	}),
});
