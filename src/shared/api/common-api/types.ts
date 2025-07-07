import type {
	AssetCurrentState,
	EAssetType,
	EPortfolioType,
} from "@prisma/client";
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { TIndicatorsData, TMoexIndex } from "shared/types";

export type TGetIndicatorsApiReturn = TIndicatorsData;
export type TGetMoexIndexApiReturn = TMoexIndex;
export type TGetPortfoliosApiReturn = {
	id: number;
	name: string;
	type: EPortfolioType;
	createdAt: Date;
}[];

export type TGetAssetsApiReturn = Record<string, AssetCurrentState[]>;

export type TPostCreatePortfolioApiParams = {
	name: string;
	type: EPortfolioType;
};
export type TPostCreatePortfolioApiReturn = {
	id: number;
	name: string;
	type: EPortfolioType;
	createdAt: Date;
};

export type TAppBaseQuery = BaseQueryFn<
	FetchArgs,
	unknown,
	FetchBaseQueryError
>;
export type TAppTagTypes = "Portfolio" | "Asset";

export type TPostCreateAssetApiParams = {
	name: string;
	type: EAssetType;
	portfolio: number;
	quantity: number;
	price: number;
};
export type TPostCreateAssetApiReturn = AssetCurrentState;

export type TPutUpdateAssetApiParams = {
	name: string;
	portfolio: number;
	quantity: number;
	price: number;
}[];
export type TPutUpdateAssetApiReturn = AssetCurrentState[];
