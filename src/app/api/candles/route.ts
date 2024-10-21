import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const to = searchParams.get('to');
	const from = searchParams.get('from');
	const instrumentId = searchParams.get('instrumentId');
	const interval = searchParams.get('interval');

	const res = await fetch(
		'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.MarketDataService/GetCandles',
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + process.env.AUTH_TOKEN,
			},
			body: JSON.stringify({
				from,
				to,
				instrumentId,
				interval,
				candleSourceType: 'CANDLE_SOURCE_UNSPECIFIED',
				limit: 12,
			}),
			cache: 'no-cache',
		}
	);

	if (!res.ok) throw new Error('Failed fetch response T-Invest');

	const data = await res.json();

	return NextResponse.json(data);
}
