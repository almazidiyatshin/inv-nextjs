import { IPortfolioResponse } from '@/config/api/types';
import { NextResponse } from 'next/server';

export async function POST() {
	const res = await fetch(
		'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.OperationsService/GetPortfolio',
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + process.env.AUTH_TOKEN,
			},
			body: JSON.stringify({
				accountId: process.env.ACC_ID,
				currency: 'RUB',
			}),
			cache: 'no-store',
		}
	);

	if (!res.ok) throw new Error('Failed fetch response T-Invest');

	const data: IPortfolioResponse = await res.json();
	const { totalAmountShares, positions } = data;

	return NextResponse.json({ totalAmountShares, positions });
}
