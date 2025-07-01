import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getRequests, postRequests } from "./requests";

export const commonApi = createApi({
	reducerPath: "commonApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: (builder) => ({
		...getRequests(builder),
		...postRequests(builder),
	}),
});

export const useCommonApi = {
	getIndicators: commonApi.useGetIndicatorsQuery,
	getMoexIndex: commonApi.useGetMoexIndexQuery,

	postCreatePortfolioSnapshot: commonApi.usePostCreatePortfolioSnapshotMutation,
};
