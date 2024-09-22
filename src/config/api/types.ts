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

export type TPortfolioResponse = Pick<
	IPortfolioResponse,
	'positions' | 'totalAmountShares'
>;

export type TPostPortfolioData = {
	allSharesSum: number;
	allBondsSum: number;
	goldSum: number;
	totalSum: number;
	tbruSum: number;
	tlcbSum: number;
	tpaySum: number;
	tmosSum: number;
	titrSum: number;
	otherSharesSum: number;
	goldUnits: string;
};
