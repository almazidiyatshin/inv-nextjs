import {
	createPortfolio,
	getAllPortfolios,
} from "app/server/services/portfolio.service";
import { type NextRequest, NextResponse } from "next/server";
import type { TPostCreatePortfolioApiParams } from "shared/api";

export async function GET() {
	try {
		const allPortfolios = await getAllPortfolios();

		return NextResponse.json(allPortfolios, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				message: "Ошибка при получении всех портфелей",
				error: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const body: TPostCreatePortfolioApiParams = await req.json();

		const newPortfolio = await createPortfolio(body);

		return NextResponse.json(newPortfolio, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{
				message: "Ошибка при создании портфеля",
				error: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
