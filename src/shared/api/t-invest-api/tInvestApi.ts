import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { postRequests } from "./requests";

export const tInvestApi = createApi({
	reducerPath: "tInvestApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: (builder) => ({
		...postRequests(builder),
	}),
});

export const useTInvestApi = {
	postPortfolio: tInvestApi.usePostPortfolioQuery,
	postTgld: tInvestApi.usePostTgldCandlesMutation,
	postTbru: tInvestApi.usePostTbruCandlesMutation,
	postTlcb: tInvestApi.usePostTlcbCandlesMutation,
	postTofz: tInvestApi.usePostTofzCandlesMutation,
	postTmos: tInvestApi.usePostTmosCandlesMutation,
	postBelu: tInvestApi.usePostBeluCandlesMutation,
	postChmf: tInvestApi.usePostChmfCandlesMutation,
	postMagn: tInvestApi.usePostMagnCandlesMutation,
	postMgnt: tInvestApi.usePostMgntCandlesMutation,
	postNlmk: tInvestApi.usePostNlmkCandlesMutation,
};
