import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type {
	TAppBaseQuery,
	TAppTagTypes,
	TPostCreatePortfolioSnapshotApiParams,
	TPostCreatePortfolioSnapshotApiReturn,
} from "../types";

export const postRequests = (
	builder: EndpointBuilder<TAppBaseQuery, TAppTagTypes, "commonApi">,
) => ({
	postCreatePortfolioSnapshot: builder.mutation<
		TPostCreatePortfolioSnapshotApiReturn,
		TPostCreatePortfolioSnapshotApiParams
	>({
		query: ({ body }) => ({
			url: `/portfolio`,
			method: "POST",
			body,
		}),
	}),
});
