import { getMoexIndex } from "app/server/services/moexIndex.service";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const data = await getMoexIndex();

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				message: "Ошибка при получении индекса MOEX",
				error: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
