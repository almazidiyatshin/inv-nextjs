import type { EPortfolioType } from "@prisma/client";

export enum EAddPortfolioFormField {
	NAME = "name",
	TYPE = "type",
}

export type TAddPortfolioFormValues = {
	[EAddPortfolioFormField.NAME]: string;
	[EAddPortfolioFormField.TYPE]: EPortfolioType[];
};
