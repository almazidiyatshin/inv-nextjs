import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type {
	TAppBaseQuery,
	TAppTagTypes,
	TGetIndicatorsApiReturn,
	TGetMoexIndexApiReturn,
} from "../types";

export const getRequests = (
	builder: EndpointBuilder<TAppBaseQuery, TAppTagTypes, "commonApi">,
) => ({
	getIndicators: builder.query<TGetIndicatorsApiReturn, void>({
		query: () => ({
			url: "/indicators",
		}),
	}),
	getMoexIndex: builder.query<TGetMoexIndexApiReturn, void>({
		query: () => ({ url: "/moexIndex" }),
	}),
});
