import { NextResponse } from 'next/server';

export async function POST() {
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
				// from: '',
				// to: '',
				interval: 'CANDLE_INTERVAL_MONTH',
				// instrumentId: 'TCS10A101X50',
				candleSourceType: 'CANDLE_SOURCE_UNSPECIFIED',
				limit: 2,
			}),
		}
	);

	if (!res.ok) throw new Error('Failed fetch response T-Invest');

	const data = await res.json();

	return NextResponse.json(data);
}
