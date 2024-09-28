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

		postTbruCandles: builder.mutation<number, TPostCandlesParams>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: etfIds.TBRU },
			}),
			transformResponse: (response: ICandlesResponse) =>
				getPreparedCandlesData(response),
		}),

		postTlcbCandles: builder.mutation<number, TPostCandlesParams>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: etfIds.TLCB },
			}),
			transformResponse: (response: ICandlesResponse) =>
				getPreparedCandlesData(response),
		}),

		postTpayCandles: builder.mutation<number, TPostCandlesParams>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: etfIds.TPAY },
			}),
			transformResponse: (response: ICandlesResponse) =>
				getPreparedCandlesData(response),
		}),

		postTmosCandles: builder.mutation<number, TPostCandlesParams>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: etfIds.TMOS },
			}),
			transformResponse: (response: ICandlesResponse) =>
				getPreparedCandlesData(response),
		}),

		postTitrCandles: builder.mutation<number, TPostCandlesParams>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: etfIds.TITR },
			}),
			transformResponse: (response: ICandlesResponse) =>
				getPreparedCandlesData(response),
		}),
	}),
});

export const {
	usePostPortfolioMutation,
	usePostTgldCandlesMutation,
	usePostTbruCandlesMutation,
	usePostTlcbCandlesMutation,
	usePostTpayCandlesMutation,
	usePostTmosCandlesMutation,
	usePostTitrCandlesMutation,
} = tInvestApi;
