import { getSession } from "next-auth/react";
import { generateCandleData } from "../mocks/postCandles";
import {
	postPortfolioMockedResponse1,
	postPortfolioMockedResponse2,
} from "../mocks/postPortfolio";
import type {
	ICandlesResponse,
	TPortfolioResponse,
	TPostCandlesApiParams,
} from "../types";
import { getPreparedPortfolioData } from "./getPrearedPortfolioData";
import { getPreparedCandlesData } from "./getPreparedCandlesData";

export const postPortfolioQueryFn = async (
	_userData: undefined,
	_api: undefined,
	_extraOptions: undefined,
	baseQuery: any,
) => {
	const session = await getSession();
	const isAuthenticated = session?.user?.role === "admin";

	if (!isAuthenticated) {
		return {
			data: getPreparedPortfolioData([
				postPortfolioMockedResponse1,
				postPortfolioMockedResponse2,
			]),
		};
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const result: { data: TPortfolioResponse } = await baseQuery({
		url: "/portfolio",
		method: "POST",
	});

	return {
		data: getPreparedPortfolioData(result.data),
	};
};

export const postCandlesQueryFn = async (
	userData: TPostCandlesApiParams,
	_api: undefined,
	_extraOptions: undefined,
	baseQuery: any,
) => {
	const session = await getSession();
	const isAuthenticated = session?.user?.role === "admin";

	if (!isAuthenticated) {
		const data = getPreparedCandlesData(generateCandleData(userData.limit));
		return { data };
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const result = await baseQuery({
		url: "/candles",
		method: "POST",
		params: userData,
	});

	return {
		data: getPreparedCandlesData(result.data as ICandlesResponse),
	};
};
