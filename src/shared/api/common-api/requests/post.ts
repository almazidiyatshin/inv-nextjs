import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type {
	TAppBaseQuery,
	TAppTagTypes,
	TPostCreateAssetApiParams,
	TPostCreateAssetApiReturn,
	TPostCreatePortfolioApiParams,
	TPostCreatePortfolioApiReturn,
} from "../types";

export const postRequests = (
	builder: EndpointBuilder<TAppBaseQuery, TAppTagTypes, "commonApi">,
) => ({
	postCreatePortfolio: builder.mutation<
		TPostCreatePortfolioApiReturn,
		TPostCreatePortfolioApiParams
	>({
		query: (body) => ({
			url: `/portfolios`,
			method: "POST",
			body,
		}),
		invalidatesTags: ["Portfolio"],
	}),

	postCreateAsset: builder.mutation<
		TPostCreateAssetApiReturn,
		TPostCreateAssetApiParams
	>({
		query: (body) => ({
			url: `/assets`,
			method: "POST",
			body,
		}),
		invalidatesTags: ["Asset"],
	}),
});
