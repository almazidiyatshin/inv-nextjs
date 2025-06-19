import { NextResponse } from 'next/server';
import { IMoexResponse } from 'shared/api/tInvest-api/types';

export async function GET() {
	const res = await fetch(
		'https://iss.moex.com/iss/engines/stock/markets/index/securities/IMOEX.json',
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			cache: 'no-store',
		}
	);

	if (!res.ok) throw new Error('Failed fetch response MOEX');

	const data: IMoexResponse = await res.json();

	return NextResponse.json(data.marketdata.data[0].at(4));
}
