import type { BaseQueryApi, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { getSession } from "next-auth/react";
import type { TAppBaseQuery } from "shared/api/common-api/types";
import { generateCandleData } from "../mocks/postCandles";
import {
	postPortfolioMockedResponse1,
	postPortfolioMockedResponse2,
} from "../mocks/postPortfolio";
import type {
	ICandlesResponse,
	TPortfolioResponse,
	TPostCandlesApiParams,
	TPostCandlesApiReturn,
	TPostPortfolioReturn,
} from "../types";
import { getPreparedPortfolioData } from "./getPrearedPortfolioData";
import { getPreparedCandlesData } from "./getPreparedCandlesData";

export const postPortfolioQueryFn = async (
	_arg: undefined,
	api: BaseQueryApi,
	extraOptions: object,
	baseQuery: TAppBaseQuery,
): Promise<{ data: TPostPortfolioReturn } | { error: FetchBaseQueryError }> => {
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

	const result = await baseQuery(
		{
			url: "/tInvestPortfolio",
			method: "POST",
		},
		api,
		extraOptions,
	);

	if (result.error) {
		return result as { error: FetchBaseQueryError };
	}

	return {
		data: getPreparedPortfolioData(result.data as TPortfolioResponse),
	};
};

export const postCandlesQueryFn = async (
	arg: TPostCandlesApiParams,
	api: BaseQueryApi,
	extraOptions: object,
	baseQuery: TAppBaseQuery,
): Promise<
	{ data: TPostCandlesApiReturn } | { error: FetchBaseQueryError }
> => {
	const session = await getSession();
	const isAuthenticated = session?.user?.role === "admin";

	if (!isAuthenticated) {
		const data = getPreparedCandlesData(generateCandleData(arg.limit));
		return { data };
	}

	const result = await baseQuery(
		{
			url: "/candles",
			method: "POST",
			params: arg,
		},
		api,
		extraOptions,
	);

	return {
		data: getPreparedCandlesData(result.data as ICandlesResponse),
	};
};
