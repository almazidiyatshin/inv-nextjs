import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TGetIndicatorsResponse } from './types';

export const cbApi = createApi({
	reducerPath: 'cbApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: (builder) => ({
		getIndicators: builder.query<TGetIndicatorsResponse, void>({
			query: () => '/cb',
		}),
	}),
});

export const { useGetIndicatorsQuery } = cbApi;
