import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getRequests, postRequests } from "./requests";
import { putRequests } from "./requests/put";

export const commonApi = createApi({
	reducerPath: "commonApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	tagTypes: ["Portfolio"],
	endpoints: (builder) => ({
		...getRequests(builder),
		...postRequests(builder),
		...putRequests(builder),
	}),
});

export const useCommonApi = {
	getIndicators: commonApi.useGetIndicatorsQuery,
	getMoexIndex: commonApi.useGetMoexIndexQuery,
	getPortfolios: commonApi.useGetPortfoliosQuery,
	getAssets: commonApi.useGetAssetsQuery,
	getUsdExchangeRate: commonApi.useGetUsdExchangeRateQuery,

	postCreatePortfolio: commonApi.usePostCreatePortfolioMutation,
	postCreateAsset: commonApi.usePostCreateAssetMutation,

	putUpdateAssetsState: commonApi.usePutUpdateAssetsStateMutation,
};
