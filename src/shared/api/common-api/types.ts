import type {
	EAssetCategory,
	EAssetName,
	ECurrency,
	EPortfolioName,
	EPortfolioType,
} from "@prisma/client";
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { TIndicatorsData, TMoexIndex } from "shared/types";

export type TCreatePortfolioSnapshotRequestBody = {
	name: EPortfolioName;
	type: EPortfolioType;
	assets: {
		name: EAssetName;
		quantity: number;
		price: number;
		currency: ECurrency;
		type: EAssetCategory;
	}[];
};

export type TGetIndicatorsApiReturn = TIndicatorsData;
export type TGetMoexIndexApiReturn = TMoexIndex;

export type TPostCreatePortfolioSnapshotApiParams = {
	body: TCreatePortfolioSnapshotRequestBody;
};
export type TPostCreatePortfolioSnapshotApiReturn = any;

export type TAppBaseQuery = BaseQueryFn<
	FetchArgs,
	unknown,
	FetchBaseQueryError
>;
export type TAppTagTypes = never;
