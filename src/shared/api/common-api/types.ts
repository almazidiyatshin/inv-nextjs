import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { TIndicatorsData, TMoexIndex } from "shared/types";

export type TGetIndicatorsApiReturn = TIndicatorsData;
export type TGetMoexIndexApiReturn = TMoexIndex;

export type TPostCreateAssetRecordApiParams = { assetId: string; body: any };
export type TPostCreateAssetRecordApiReturn = any;

export type TAppBaseQuery = BaseQueryFn<
	FetchArgs,
	unknown,
	FetchBaseQueryError
>;
export type TAppTagTypes = never;
