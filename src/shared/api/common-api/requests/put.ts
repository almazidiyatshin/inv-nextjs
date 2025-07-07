import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type {
	TAppBaseQuery,
	TAppTagTypes,
	TPutUpdateAssetApiParams,
	TPutUpdateAssetApiReturn,
} from "../types";

export const putRequests = (
	builder: EndpointBuilder<TAppBaseQuery, TAppTagTypes, "commonApi">,
) => ({
	putUpdateAssetsState: builder.mutation<
		TPutUpdateAssetApiReturn,
		TPutUpdateAssetApiParams
	>({
		query: (body) => ({
			url: `/assets`,
			method: "PUT",
			body,
		}),
	}),
});
