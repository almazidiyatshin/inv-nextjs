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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	virtualPositions: any[]; // TODO fix any
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
	tgldCount: string;
	tbruCount: string;
	tlcbCount: string;
	tpayCount: string;
	tmosCount: string;
	titrCount: string;
	beluCount: string;
	chmfCount: string;
	magnCount: string;
	mgntCount: string;
	nlmkCount: string;
	novaCount: string;
	rosnCount: string;
	sberpCount: string;
};

type Candle = {
	close: {
		units: string;
		nano: number;
	};
	time: string;
};

export interface ICandlesResponse {
	candles: Candle[];
}

export type TPostCandlesApiParams = {
	from: string;
	to: string;
	instrumentId: string;
	interval: string;
};
export type TPostCandlesApiReturn = {
	lastPrice: number;
	lastPrices: { [key: string]: number };
};
