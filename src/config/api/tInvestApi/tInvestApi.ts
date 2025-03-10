import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	TPostCandlesApiReturn,
	TPostCandlesApiParams,
	TPostPortfolioData,
} from './types';
import { postCandlesQueryFn, postPortfolioQueryFn } from './utils/queryFns';

export const tInvestApi = createApi({
	reducerPath: 'tInvestApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: (builder) => ({
		postPortfolio: builder.mutation<TPostPortfolioData, void>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postPortfolioQueryFn,
		}),

		postTgldCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postCandlesQueryFn,
		}),

		postTbruCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postCandlesQueryFn,
		}),

		postTlcbCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postCandlesQueryFn,
		}),

		postTofzCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postCandlesQueryFn,
		}),

		postTmosCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postCandlesQueryFn,
		}),

		postTitrCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postCandlesQueryFn,
		}),

		postLqdtCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postCandlesQueryFn,
		}),

		postBeluCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postCandlesQueryFn,
		}),

		postChmfCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postCandlesQueryFn,
		}),

		postMagnCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postCandlesQueryFn,
		}),

		postMgntCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postCandlesQueryFn,
		}),

		postNlmkCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postCandlesQueryFn,
		}),

		postSberpCandles: builder.mutation<
			TPostCandlesApiReturn,
			TPostCandlesApiParams
		>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: postCandlesQueryFn,
		}),
	}),
});

export const {
	usePostPortfolioMutation,
	usePostTgldCandlesMutation,
	usePostTbruCandlesMutation,
	usePostTlcbCandlesMutation,
	usePostTofzCandlesMutation,
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
