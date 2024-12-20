import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	ICandlesResponse,
	TPortfolioResponse,
	TPostCandlesApiReturn,
	TPostCandlesApiParams,
	TPostPortfolioData,
} from './types';
import { etfIds, sharesIds } from '@/constants/common';
import { getPreparedPortfolioData } from './utils/getPrearedPortfolioData';
import { getPreparedCandlesData } from './utils/getPreparedCandlesData';

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

		postTgldCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: etfIds.TGLD },
			}),
			transformResponse: (response: ICandlesResponse, _, arg) =>
				getPreparedCandlesData(response, arg.interval),
		}),

		postTbruCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: etfIds.TBRU },
			}),
			transformResponse: (response: ICandlesResponse, _, arg) =>
				getPreparedCandlesData(response, arg.interval),
		}),

		postTlcbCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: etfIds.TLCB },
			}),
			transformResponse: (response: ICandlesResponse, _, arg) =>
				getPreparedCandlesData(response, arg.interval),
		}),

		postTpayCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: etfIds.TPAY },
			}),
			transformResponse: (response: ICandlesResponse, _, arg) =>
				getPreparedCandlesData(response, arg.interval),
		}),

		postTmosCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: etfIds.TMOS },
			}),
			transformResponse: (response: ICandlesResponse, _, arg) =>
				getPreparedCandlesData(response, arg.interval),
		}),

		postTitrCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: etfIds.TITR },
			}),
			transformResponse: (response: ICandlesResponse, _, arg) =>
				getPreparedCandlesData(response, arg.interval),
		}),

		postLqdtCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: etfIds.LQDT },
			}),
			transformResponse: (response: ICandlesResponse, _, arg) =>
				getPreparedCandlesData(response, arg.interval),
		}),

		postBeluCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: sharesIds.BELU },
			}),
			transformResponse: (response: ICandlesResponse, _, arg) =>
				getPreparedCandlesData(response, arg.interval),
		}),

		postChmfCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: sharesIds.CHMF },
			}),
			transformResponse: (response: ICandlesResponse, _, arg) =>
				getPreparedCandlesData(response, arg.interval),
		}),

		postMagnCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: sharesIds.MAGN },
			}),
			transformResponse: (response: ICandlesResponse, _, arg) =>
				getPreparedCandlesData(response, arg.interval),
		}),

		postMgntCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: sharesIds.MGNT },
			}),
			transformResponse: (response: ICandlesResponse, _, arg) =>
				getPreparedCandlesData(response, arg.interval),
		}),

		postNlmkCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: sharesIds.NLMK },
			}),
			transformResponse: (response: ICandlesResponse, _, arg) =>
				getPreparedCandlesData(response, arg.interval),
		}),

		postSberpCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			query: (params) => ({
				url: '/candles',
				method: 'POST',
				params: { ...params, instrumentId: sharesIds.SBERP },
			}),
			transformResponse: (response: ICandlesResponse, _, arg) =>
				getPreparedCandlesData(response, arg.interval),
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
	usePostBeluCandlesMutation,
	usePostChmfCandlesMutation,
	usePostMagnCandlesMutation,
	usePostMgntCandlesMutation,
	usePostNlmkCandlesMutation,
	usePostSberpCandlesMutation,
	usePostLqdtCandlesMutation,
} = tInvestApi;
