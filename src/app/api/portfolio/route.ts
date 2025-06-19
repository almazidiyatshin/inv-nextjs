import { NextResponse } from 'next/server';
import { IPortfolioResponse } from 'shared/api/tInvest-api/types';

export async function POST() {
	const iisResponse = await fetch(
		'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.OperationsService/GetPortfolio',
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + process.env.AUTH_TOKEN,
			},
			body: JSON.stringify({
				accountId: process.env.IIS_ACC_ID,
				currency: 'RUB',
			}),
			cache: 'no-store',
		}
	);

	const brokerageResponse = await fetch(
		'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.OperationsService/GetPortfolio',
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + process.env.AUTH_TOKEN,
			},
			body: JSON.stringify({
				accountId: process.env.BROKERAGE_ACC_ID,
				currency: 'RUB',
			}),
			cache: 'no-store',
		}
	);

	if (!iisResponse.ok || !brokerageResponse.ok) {
		throw new Error('Failed fetch response T-Invest');
	}

	const iisData: IPortfolioResponse = await iisResponse.json();
	const brokerageData: IPortfolioResponse = await brokerageResponse.json();

	return NextResponse.json([
		{
			totalAmountShares: iisData.totalAmountShares,
			expectedYield: iisData.expectedYield,
			positions: iisData.positions,
		},
		{
			totalAmountShares: brokerageData.totalAmountShares,
			expectedYield: brokerageData.expectedYield,
			positions: brokerageData.positions,
		},
	]);
}
