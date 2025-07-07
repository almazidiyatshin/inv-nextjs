import type { EAssetType } from "@prisma/client";

export enum EAddAssetsFormField {
	NAME = "name",
	QUANTITY = "quantity",
	PRICE = "price",
	TYPE = "type",
	PORTFOLIO = "portfolio",
}

export type TAddAssetsFormValues = {
	[EAddAssetsFormField.NAME]: string;
	[EAddAssetsFormField.QUANTITY]: number;
	[EAddAssetsFormField.PRICE]: number;
	[EAddAssetsFormField.TYPE]: EAssetType[];
	[EAddAssetsFormField.PORTFOLIO]: string[];
};
