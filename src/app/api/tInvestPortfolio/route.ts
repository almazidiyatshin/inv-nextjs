import { getPortfolio } from "app/server/services/tInvestPortfolio.service";
import { NextResponse } from "next/server";

export async function POST() {
	if (!process.env.IIS_ACC_ID || !process.env.BROKERAGE_ACC_ID) {
		throw new Error("Отсутствует portfolioId для получения портфеля T-Invest");
	}

	try {
		const iisPortfolio = await getPortfolio(process.env.IIS_ACC_ID);
		const brokeragePortfolio = await getPortfolio(process.env.BROKERAGE_ACC_ID);

		return NextResponse.json(
			[
				{
					totalAmountShares: iisPortfolio.totalAmountShares,
					expectedYield: iisPortfolio.expectedYield,
					positions: iisPortfolio.positions,
				},
				{
					totalAmountShares: brokeragePortfolio.totalAmountShares,
					expectedYield: brokeragePortfolio.expectedYield,
					positions: brokeragePortfolio.positions,
				},
			],
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Ошибка при получении портфелей T-Invest",
				error: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
