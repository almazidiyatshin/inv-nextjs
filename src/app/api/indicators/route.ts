import { getIndicators } from "app/server/services/indicators.service";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const data = await getIndicators();

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				message: "Ошибка при получении индикаторов",
				error: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
