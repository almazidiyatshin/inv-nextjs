import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TGetIndicatorsApiReturn } from './types';

export const commonApi = createApi({
	reducerPath: 'commonApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: (builder) => ({
		getIndicators: builder.query<TGetIndicatorsApiReturn, void>({
			query: () => '/indicators',
		}),
	}),
});

export const { useGetIndicatorsQuery } = commonApi;
