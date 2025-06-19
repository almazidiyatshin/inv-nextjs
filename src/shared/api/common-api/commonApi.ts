import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TGetIndicatorsApiReturn, TGetMoexIndexApiReturn } from './types';
import { getIndicatorsQueryFn, getMoexIndexQueryFn } from './utils/queryFns';

export const commonApi = createApi({
	reducerPath: 'commonApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: (builder) => ({
		getIndicators: builder.query<TGetIndicatorsApiReturn, void>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: getIndicatorsQueryFn,
		}),
		getMoexIndex: builder.query<TGetMoexIndexApiReturn, void>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: getMoexIndexQueryFn,
		}),
	}),
});

export const { useGetIndicatorsQuery, useGetMoexIndexQuery } = commonApi;
