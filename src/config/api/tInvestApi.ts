import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPortfolioResponse, TPostPortfolioData } from './types';
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
			transformResponse: (response: IPortfolioResponse) =>
				getPortfolioData(response),
		}),
	}),
});

export const { usePostPortfolioMutation } = tInvestApi;
