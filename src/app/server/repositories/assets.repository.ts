import { type EAssetType, ECurrency } from "@prisma/client";
import type { TPrismaExtendedClient } from "../lib";
import type { TAssetDbInput, TGetAllAssetsParams } from "../types/assets";

export async function getAllAssetCurrentStates(
	prisma: TPrismaExtendedClient,
	options: TGetAllAssetsParams = {},
) {
	const { type } = options;

	const whereClause: any = {};

	if (type) {
		whereClause.asset = {
			type: type,
		};
	}

	const assets = await prisma.assetCurrentState.findMany({
		where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
		include: {
			portfolio: {
				select: {
					name: true,
				},
			},
			asset: {
				select: {
					name: true,
					type: true,
				},
			},
		},
		orderBy: [
			{
				portfolio: {
					name: "asc",
				},
			},
			{
				asset: {
					name: "asc",
				},
			},
		],
	});

	return assets;
}

export async function getOrCreateAsset(
	prisma: TPrismaExtendedClient,
	name: string,
	type: EAssetType,
) {
	return await prisma.asset.upsert({
		where: { name },
		update: {},
		create: { name, type },
	});
}

export async function getByPortfolioIdAndAssetName(
	prisma: TPrismaExtendedClient,
	assetName: string,
	portfolioId: number,
) {
	const asset = await prisma.assetCurrentState.findFirst({
		where: {
			portfolioId,
			asset: {
				name: assetName,
			},
		},
		include: {
			asset: true,
		},
	});

	return asset;
}

export async function save(prisma: TPrismaExtendedClient, data: TAssetDbInput) {
	const { portfolio: portfolioId, name, type, quantity, price } = data;

	let assetType = type;

	if (!assetType) {
		const existingAsset = await prisma.asset.findUnique({
			where: { name },
		});

		if (!existingAsset) {
			throw new Error(
				`Невозможно обновить актив: актив "${name}" не найден в базе данных`,
			);
		}

		assetType = existingAsset.type;
	}

	const asset = await getOrCreateAsset(prisma, name, assetType);

	const [_, newAssetCurrentState] = await prisma.$transaction([
		// Создаем запись в истории
		prisma.assetRecord.create({
			data: {
				portfolioId,
				assetId: asset.id,
				quantity,
				price,
				currency: ECurrency.RUB,
			},
		}),

		prisma.assetCurrentState.upsert({
			where: {
				portfolioId_assetId: {
					portfolioId,
					assetId: asset.id,
				},
			},
			update: {
				quantity,
				price,
				currency: ECurrency.RUB,
			},
			create: {
				portfolioId,
				assetId: asset.id,
				quantity,
				price,
				currency: ECurrency.RUB,
			},
			include: {
				asset: true,
			},
		}),
	]);

	return newAssetCurrentState;
}
