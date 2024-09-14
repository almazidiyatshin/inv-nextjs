export interface ICurrencyAmount {
	currency: string;
	units: string;
	nano: number;
}

export interface IPosition {
	figi: string;
	instrumentType: string;
	quantity: ICurrencyAmount;
	averagePositionPrice: ICurrencyAmount;
	expectedYield: ICurrencyAmount;
	averagePositionPricePt: ICurrencyAmount;
	currentPrice: ICurrencyAmount;
	averagePositionPriceFifo: ICurrencyAmount;
	quantityLots: ICurrencyAmount;
	blocked: boolean;
	blockedLots: ICurrencyAmount;
	positionUid: string;
	instrumentUid: string;
	varMargin: ICurrencyAmount;
	expectedYieldFifo: ICurrencyAmount;
}

export interface IPortfolioResponse {
	totalAmountShares: ICurrencyAmount;
	totalAmountBonds: ICurrencyAmount;
	totalAmountEtf: ICurrencyAmount;
	totalAmountCurrencies: ICurrencyAmount;
	totalAmountFutures: ICurrencyAmount;
	expectedYield: ICurrencyAmount;
	positions: IPosition[];
	accountId: string;
	totalAmountOptions: ICurrencyAmount;
	totalAmountSp: ICurrencyAmount;
	totalAmountPortfolio: ICurrencyAmount;
	virtualPositions: any[];
}

export enum EEtfIds {
	TBonds = 'a9ff2a1a-f8de-4648-8d5a-6b264f32fcdf',
	TiMOEX = '9654c2dd-6993-427e-80fa-04e80a1cf4da',
	TLocalBonds = '89cdfd81-5021-45f8-b3ac-96dffc2e70a2',
	TRosTech = '3783c7a7-4c20-49a8-8e28-f54229b414c8',
	TGold = '4c466956-d2ce-4a95-abb4-17947a65f18a',
}
