import { getUsdExchangeRate } from "app/server/services/cbr.service";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const data = await getUsdExchangeRate();

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				message: "Ошибка при получении курса доллара",
				error: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
