import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

type TParams = {
	params: { assetId: "vtb" | "sber" | "cash" };
};

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: TParams) {
	try {
		const body = await req.json();
		const { assetId } = params;
		console.log(body, assetId);

		let newRecord: any;

		switch (assetId) {
			case "vtb":
				newRecord = await prisma.vtb.create({
					data: body,
				});
				break;
			case "sber":
				newRecord = await prisma.sber.create({
					data: body,
				});
				break;
			case "cash":
				newRecord = await prisma.cash.create({
					data: body,
				});
				break;
			default:
				return NextResponse.json(
					{ error: `Неизвестный тип актива: ${assetId}` },
					{ status: 400 },
				);
		}

		return NextResponse.json(newRecord, { status: 200 });
	} catch (error) {
		console.error("[POST /api/asset]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
