export enum EFormTypes {
	VTB = 'VTB',
	SBER = 'SBER',
	CASH = 'CASH',
}

export type TAddAssetsDataFormProps = {
	type: EFormTypes;
};
