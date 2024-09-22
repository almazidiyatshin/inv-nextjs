import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TPortfolioResponse, TPostPortfolioData } from './types';
import { getPortfolioData } from './utils/getPortfolioData';

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
				getPortfolioData(response),
		}),
	}),
});

export const { usePostPortfolioMutation } = tInvestApi;
