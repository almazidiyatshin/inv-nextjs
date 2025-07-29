import { type EAssetType, ECurrency } from "@prisma/client";
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
			asset: {
				// Добавляем включение данных актива
				select: {
					name: true,
					type: true,
				},
			},
		},
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

	// Если тип не указан, пытаемся получить его из таблицы Asset напрямую
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

	// Получаем или создаем актив в таблице Asset
	const asset = await getOrCreateAsset(prisma, name, assetType);

	// Создаем записи в транзакции
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

		// Обновляем или создаем текущее состояние
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
				asset: true, // Включаем данные об активе в ответ
			},
		}),
	]);

	return newAssetCurrentState;
}
