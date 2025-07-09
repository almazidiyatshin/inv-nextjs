import type { IPortfolioResponse } from "shared/api/t-invest-api/types";

export const getPortfolio = async (portfolioId: string) => {
	const response = await fetch(
		"https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.OperationsService/GetPortfolio",
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
			},
			body: JSON.stringify({
				accountId: portfolioId,
				currency: "RUB",
			}),
			cache: "no-store",
		},
	);

	if (!response.ok) {
		throw new Error("Ошибка при получении портфеля T-Invest");
	}

	const data: IPortfolioResponse = await response.json();

	return data;
};

export const getCandles = async (searchParams: URLSearchParams) => {
	const to = searchParams.get("to");
	const from = searchParams.get("from");
	const instrumentId = searchParams.get("instrumentId");
	const interval = searchParams.get("interval");
	const limit = searchParams.get("limit");

	const response = await fetch(
		"https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.MarketDataService/GetCandles",
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
			},
			body: JSON.stringify({
				from,
				to,
				instrumentId,
				interval,
				candleSourceType: "CANDLE_SOURCE_UNSPECIFIED",
				limit,
			}),
			cache: "no-cache",
		},
	);

	if (!response.ok) {
		throw new Error("Ошибка при получении свечей T-Invest");
	}

	const data = await response.json();
	return data;
};
