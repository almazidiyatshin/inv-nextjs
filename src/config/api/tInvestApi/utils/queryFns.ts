import { getSession } from 'next-auth/react';
import { getPreparedPortfolioData } from './getPrearedPortfolioData';
import {
	postPortfolioMockedResponse1,
	postPortfolioMockedResponse2,
} from '../mocks/postPortfolio';
import {
	ICandlesResponse,
	TPortfolioResponse,
	TPostCandlesApiParams,
} from '../types';
import { getPreparedCandlesData } from './getPreparedCandlesData';
import { generateCandleData } from '../mocks/postCandles';

export const postPortfolioQueryFn = async (
	_userData: void,
	_api: void,
	_extraOptions: void,
	baseQuery: void
) => {
	const session = await getSession();
	const isAuthenticated = session?.user?.role === 'admin';

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
		url: '/portfolio',
		method: 'POST',
	});

	return {
		data: getPreparedPortfolioData(result.data),
	};
};

export const postCandlesQueryFn = async (
	userData: TPostCandlesApiParams,
	_api: void,
	_extraOptions: void,
	baseQuery: void
) => {
	const session = await getSession();
	const isAuthenticated = session?.user?.role === 'admin';

	if (!isAuthenticated) {
		const data = getPreparedCandlesData(generateCandleData(userData.limit));
		return { data };
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const result = await baseQuery({
		url: '/candles',
		method: 'POST',
		params: userData,
	});

	return {
		data: getPreparedCandlesData(result.data as ICandlesResponse),
	};
};
