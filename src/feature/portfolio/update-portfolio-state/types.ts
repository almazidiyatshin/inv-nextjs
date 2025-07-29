import type { TAssetWithDetails } from "shared/types";

export enum EUpdatePortfolioStateFormField {
	QUANTITY = "quantity",
	PRICE = "price",
}

export type TUpdatePortfolioStateFormValues = {
	[name: string]: {
		[EUpdatePortfolioStateFormField.QUANTITY]?: number;
		[EUpdatePortfolioStateFormField.PRICE]?: number;
	};
};

export type TUpdatePortfolioStateFormProps = {
	assets: TAssetWithDetails[];
};
