import type { EAssetType } from "@prisma/client";
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
	// biome-ignore lint/suspicious/noConfusingVoidType: <void needed>
	getAssets: builder.query<TGetAssetsApiReturn, { type: EAssetType } | void>({
		query: (params) => ({ url: "/assets", params: { type: params?.type } }),
		providesTags: ["Asset"],
	}),
	getUsdExchangeRate: builder.query<TGetUsdExchangeRateApiReturn, void>({
		query: () => ({
			url: "/cbr/exchangeRate",
		}),
	}),
});
