import { NextResponse } from 'next/server';

type TParams = { dateFrom: string; dateTo: string; instrumentId: string };

export async function POST({ dateFrom, dateTo, instrumentId }: TParams) {
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
				from: dateFrom,
				to: dateTo,
				interval: 'CANDLE_INTERVAL_MONTH',
				// instrumentId: 'TCS10A101X50',
				instrumentId: instrumentId,
				candleSourceType: 'CANDLE_SOURCE_UNSPECIFIED',
				limit: 2,
			}),
		}
	);

	if (!res.ok) throw new Error('Failed fetch response T-Invest');

	const data = await res.json();

	return NextResponse.json(data);
}
