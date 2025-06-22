import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { TIndicatorsData, TMoexIndex } from "shared/types";

export type TGetIndicatorsApiReturn = TIndicatorsData;
export type TGetMoexIndexApiReturn = TMoexIndex;

export type TAppBaseQuery = BaseQueryFn<
	FetchArgs,
	unknown,
	FetchBaseQueryError
>;
export type TAppTagTypes = never;
