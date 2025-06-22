import type { ECandleInterval } from "shared/constants";
import type { TPortfolioData } from "shared/types";

export interface ICurrencyAmount {
	currency?: string;
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
}

export type TPortfolio = Pick<
	IPortfolioResponse,
	"positions" | "expectedYield" | "totalAmountShares"
>;
export type TPortfolioResponse = TPortfolio[];

export type TPostPortfolioReturn = TPortfolioData;

type TCandle = {
	close: {
		units: string;
		nano: number;
	};
	time: string;
};

export interface ICandlesResponse {
	candles: TCandle[];
}

export type TPostCandlesApiParams = {
	from: string;
	to: string;
	instrumentId: string;
	interval: ECandleInterval;
	limit: number;
};
export type TPostCandlesApiReturn = {
	lastPrices: { [key: string]: number };
};

type TMarketData = {
	data: string[][];
};
export type IMoexResponse = {
	marketdata: TMarketData;
};
