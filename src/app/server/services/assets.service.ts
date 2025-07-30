import { getServerSession } from "next-auth";
import type {
	TPostCreateAssetApiParams,
	TPutUpdateAssetApiParams,
} from "shared/api";
import type { TAssetWithDetails } from "shared/types";
import { getPrismaClient } from "../lib";
import {
	getAllAssetCurrentStates,
	getByPortfolioIdAndAssetName,
	save,
} from "../repositories/assets.repository";
import type { TGetAllAssetsParams } from "../types/assets";

export async function getAllAssets(options: TGetAllAssetsParams = {}) {
	const session = await getServerSession();
	const isProd =
		process.env.NODE_ENV === "production" &&
		session?.user.email === process.env.ADMIN_EMAIL;
	const prisma = getPrismaClient(isProd);

	const assets = await getAllAssetCurrentStates(prisma, options);

	const grouped = assets.reduce<Record<string, TAssetWithDetails[]>>(
		(acc, asset) => {
			const portfolioName = (asset as any).portfolio?.name || "Unknown";
			const assetName = (asset as any).asset?.name || "Unknown";
			const assetType = (asset as any).asset?.type || "SHARE";

			if (!acc[portfolioName]) {
				acc[portfolioName] = [];
			}

			acc[portfolioName].push({
				id: asset.id,
				name: assetName,
				type: assetType,
				quantity: asset.quantity,
				price: asset.price,
				updatedAt: asset.updatedAt,
				portfolioId: asset.portfolioId,
				currency: asset.currency,
			});

			return acc;
		},
		{},
	);

	return grouped;
}

export async function createAsset(body: TPostCreateAssetApiParams) {
	const session = await getServerSession();
	const isProd =
		process.env.NODE_ENV === "production" &&
		session?.user.email === process.env.ADMIN_EMAIL;
	const prisma = getPrismaClient(isProd);

	const existingAsset = await getByPortfolioIdAndAssetName(
		prisma,
		body.name,
		body.portfolio,
	);

	if (existingAsset) {
		throw new Error(`Актив "${body.name}" уже существует в этом портфеле.`);
	}

	const newAsset = await save(prisma, body);

	return newAsset;
}

export async function updateAssets(body: TPutUpdateAssetApiParams) {
	const session = await getServerSession();
	const isProd =
		process.env.NODE_ENV === "production" &&
		session?.user.email === process.env.ADMIN_EMAIL;
	const prisma = getPrismaClient(isProd);

	const assets = await Promise.all(body.map((data) => save(prisma, data)));

	return assets;
}
