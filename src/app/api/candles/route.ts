import { getCandles } from "app/server/services/tInvestPortfolio.service";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { searchParams } = request.nextUrl;
		const data = await getCandles(searchParams);

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				message: "Ошибка при получении исторических данных T-Invest",
				error: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
