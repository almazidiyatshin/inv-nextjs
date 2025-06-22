import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getRequests } from "./requests";

export const commonApi = createApi({
	reducerPath: "commonApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: (builder) => ({
		...getRequests(builder),
	}),
});

export const useCommonApi = {
	getIndicators: commonApi.useGetIndicatorsQuery,
	getMoexIndex: commonApi.useGetMoexIndexQuery,
};
