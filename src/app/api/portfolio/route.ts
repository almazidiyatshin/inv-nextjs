import { EAssetCategory, EPortfolioType, PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";
import type { TCreatePortfolioSnapshotRequestBody } from "shared/api";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		const body: TCreatePortfolioSnapshotRequestBody = await req.json();

		if (
			!body.name ||
			!body.type ||
			!Array.isArray(body.assets) ||
			body.assets.length === 0
		) {
			return NextResponse.json(
				{
					message: "Недостаточно данных: name, type и assets обязательны.",
				},
				{ status: 400 },
			);
		}

		if (!Object.values(EPortfolioType).includes(body.type)) {
			return NextResponse.json(
				{ message: `Недопустимое значение type: ${body.type}` },
				{ status: 400 },
			);
		}
		for (const asset of body.assets) {
			if (
				!asset.name ||
				typeof asset.quantity !== "number" ||
				typeof asset.price !== "number" ||
				!asset.type
			) {
				return NextResponse.json(
					{
						message: `Недостаточно данных для актива: name, quantity, price и type обязательны.`,
					},
					{ status: 400 },
				);
			}
			if (!Object.values(EAssetCategory).includes(asset.type)) {
				return NextResponse.json(
					{
						message: `Недопустимое значение type для name ${asset.name}: ${asset.type}`,
					},
					{ status: 400 },
				);
			}
		}

		// const newSnapshot = await prisma.$transaction(async (tx) => {
		// 	const portfolio = await tx.portfolio.create({
		// 		data: {
		// 			name: body.name,
		// 			type: body.type,
		// 		},
		// 	});

		// 	const assets = body.assets.map((asset) => ({
		// 		...asset,
		// 		portfolioId: portfolio.id,
		// 	}));

		// 	await tx.assetRecord.createMany({
		// 		data: assets,
		// 	});

		// 	return portfolio;
		// });

		return NextResponse.json(
			{
				message: "Снимок портфеля и активы успешно созданы",
				// snapshotId: newSnapshot.id,
				// createdAt: newSnapshot.createdAt,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Ошибка при создании снимка портфеля:", error);
		return NextResponse.json(
			{
				message: "Ошибка сервера при создании записи",
				error: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
