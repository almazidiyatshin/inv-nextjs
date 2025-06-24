import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type { TAppBaseQuery, TAppTagTypes } from "shared/api/common-api/types";
import type {
	TPostCandlesApiParams,
	TPostCandlesApiReturn,
	TPostPortfolioReturn,
} from "../types";
import { postCandlesQueryFn, postPortfolioQueryFn } from "../utils";

export const postRequests = (
	builder: EndpointBuilder<TAppBaseQuery, TAppTagTypes, "tInvestApi">,
) => ({
	postPortfolio: builder.query<TPostPortfolioReturn, void>({
		queryFn: postPortfolioQueryFn,
	}),

	postTgldCandles: builder.mutation<
		TPostCandlesApiReturn,
		TPostCandlesApiParams
	>({
		queryFn: postCandlesQueryFn,
	}),

	postTbruCandles: builder.mutation<
		TPostCandlesApiReturn,
		TPostCandlesApiParams
	>({
		queryFn: postCandlesQueryFn,
	}),

	postTlcbCandles: builder.mutation<
		TPostCandlesApiReturn,
		TPostCandlesApiParams
	>({
		queryFn: postCandlesQueryFn,
	}),

	postTofzCandles: builder.mutation<
		TPostCandlesApiReturn,
		TPostCandlesApiParams
	>({
		queryFn: postCandlesQueryFn,
	}),

	postTmosCandles: builder.mutation<
		TPostCandlesApiReturn,
		TPostCandlesApiParams
	>({
		queryFn: postCandlesQueryFn,
	}),

	postBeluCandles: builder.mutation<
		TPostCandlesApiReturn,
		TPostCandlesApiParams
	>({
		queryFn: postCandlesQueryFn,
	}),

	postChmfCandles: builder.mutation<
		TPostCandlesApiReturn,
		TPostCandlesApiParams
	>({
		queryFn: postCandlesQueryFn,
	}),

	postMagnCandles: builder.mutation<
		TPostCandlesApiReturn,
		TPostCandlesApiParams
	>({
		queryFn: postCandlesQueryFn,
	}),

	postMgntCandles: builder.mutation<
		TPostCandlesApiReturn,
		TPostCandlesApiParams
	>({
		queryFn: postCandlesQueryFn,
	}),

	postNlmkCandles: builder.mutation<
		TPostCandlesApiReturn,
		TPostCandlesApiParams
	>({
		queryFn: postCandlesQueryFn,
	}),
});
