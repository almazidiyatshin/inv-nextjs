import type { EAssetName, EPortfolioName } from "@prisma/client";
import type { FieldError } from "react-hook-form";

export type TAddAssetsDataFormProps = {
	portfolioId: EPortfolioName;
};

type TFieldData = {
	quantity: number;
	price: number;
};
export type TFields = { [key in EAssetName]: TFieldData };

type TFieldKeys = keyof TFields;
type TDotNotationPaths = {
	[K in TFieldKeys]: `${K}.${keyof TFieldData}`;
}[TFieldKeys];
type TCombinedPaths = TFieldKeys | TDotNotationPaths;

export type TFieldProps = {
	required: boolean;
	label: string;
	fieldName: TCombinedPaths;
	error?: FieldError;
};
