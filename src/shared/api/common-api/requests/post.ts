import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type {
	TAppBaseQuery,
	TAppTagTypes,
	TPostCreateAssetRecordApiParams,
	TPostCreateAssetRecordApiReturn,
} from "../types";

export const postRequests = (
	builder: EndpointBuilder<TAppBaseQuery, TAppTagTypes, "commonApi">,
) => ({
	postCreateAssetRecord: builder.mutation<
		TPostCreateAssetRecordApiReturn,
		TPostCreateAssetRecordApiParams
	>({
		query: ({ assetId, body }) => ({
			url: `/asset/${assetId}`,
			method: "POST",
			body,
		}),
	}),
});
