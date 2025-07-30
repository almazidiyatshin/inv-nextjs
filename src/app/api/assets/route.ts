import type { EAssetType } from "@prisma/client";
import {
	createAsset,
	getAllAssets,
	updateAssets,
} from "app/server/services/assets.service";
import { type NextRequest, NextResponse } from "next/server";
import type {
	TPostCreateAssetApiParams,
	TPutUpdateAssetApiParams,
} from "shared/api";

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const type = searchParams.get("type") as EAssetType | null;

		const assetStates = await getAllAssets({
			type,
		});

		return NextResponse.json(assetStates, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				message: "Ошибка при получении активов",
				error: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const body: TPostCreateAssetApiParams = await req.json();

		const newAsset = await createAsset(body);

		return NextResponse.json(newAsset, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{
				message: "Ошибка при создании актива",
				error: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}

export async function PUT(req: NextRequest) {
	try {
		const body: TPutUpdateAssetApiParams = await req.json();

		const updatedAssets = await updateAssets(body);

		return NextResponse.json(updatedAssets, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				message: "Ошибка при обновлении активов",
				error: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
