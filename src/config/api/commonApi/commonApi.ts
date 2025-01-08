import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TGetIndicatorsApiReturn } from './types';
import { getIndicatorsQueryFn } from './utils/queryFns';

export const commonApi = createApi({
	reducerPath: 'commonApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: (builder) => ({
		getIndicators: builder.query<TGetIndicatorsApiReturn, void>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: getIndicatorsQueryFn,
		}),
	}),
});

export const { useGetIndicatorsQuery } = commonApi;
