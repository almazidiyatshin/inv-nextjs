import type { AssetCurrentState } from "@prisma/client";

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
	assets: AssetCurrentState[];
};
