import { ECurrency } from "@prisma/client";
import type { TPrismaExtendedClient } from "../lib";
import type { TAssetDbInput } from "../types/assets";

export async function getAllAssetCurrentStates(prisma: TPrismaExtendedClient) {
	const assets = await prisma.assetCurrentState.findMany({
		include: {
			portfolio: {
				select: {
					name: true,
				},
			},
		},
	});

	return assets;
}

export async function getByPortfolioIdAndName(
	prisma: TPrismaExtendedClient,
	name: string,
	portfolioId: number,
) {
	const asset = await prisma.assetCurrentState.findUnique({
		where: {
			portfolioId_name: {
				portfolioId,
				name,
			},
		},
	});

	return asset;
}

export async function save(prisma: TPrismaExtendedClient, data: TAssetDbInput) {
	const { portfolio: portfolioId, name, type, quantity, price } = data;

	let assetType = type;

	if (!assetType) {
		const lastRecord = await prisma.assetRecord.findFirst({
			where: {
				portfolioId,
				name,
			},
			orderBy: {
				createdAt: "desc",
			},
			select: {
				type: true,
			},
		});

		if (!lastRecord) {
			throw new Error(
				`Невозможно обновить актив: нет предыдущей записи в AssetRecord для ${name}`,
			);
		}

		assetType = lastRecord.type;
	}

	const [_, newAssetCurrentState] = await prisma.$transaction([
		prisma.assetRecord.create({
			data: {
				portfolioId,
				name,
				type: assetType,
				quantity,
				price,
				currency: ECurrency.RUB,
			},
		}),

		prisma.assetCurrentState.upsert({
			where: {
				portfolioId_name: {
					portfolioId,
					name,
				},
			},
			update: {
				quantity,
				price,
				currency: ECurrency.RUB,
			},
			create: {
				portfolioId,
				name,
				quantity,
				price,
				currency: ECurrency.RUB,
			},
		}),
	]);

	return newAssetCurrentState;
}
