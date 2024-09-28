import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	ICandlesResponse,
	TPortfolioResponse,
	TPostCandlesParams,
	TPostPortfolioData,
} from './types';
import { getPreparedPortfolioData } from './utils/getPrearedPortfolioData';
import { getPreparedCandlesData } from './utils/getPreparedCandlesData';
import { etfIds } from '@/constants/common';

export const tInvestApi = createApi({
	reducerPath: 'tInvestApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: (builder) => ({
		postPortfolio: builder.mutation<TPostPortfolioData, void>({
			query: () => ({
				url: '/portfolio',
				method: 'POST',
			}),
			transformResponse: (response: TPortfolioResponse) =>
				getPreparedPortfolioData(response),
		}),

		postTgldCandles: builder.mutation<number, TPostCandlesParams>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: etfIds.TGLD },
			}),
			transformResponse: (response: ICandlesResponse) =>
				getPreparedCandlesData(response),
		}),
	}),
});

export const { usePostPortfolioMutation, usePostTgldCandlesMutation } =
	tInvestApi;
