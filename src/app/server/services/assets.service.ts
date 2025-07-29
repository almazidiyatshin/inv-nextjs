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

export async function getAllAssets() {
	const session = await getServerSession();
	const isProd =
		process.env.NODE_ENV === "production" &&
		session?.user.email === process.env.ADMIN_EMAIL;
	const prisma = getPrismaClient(isProd);

	const assets = await getAllAssetCurrentStates(prisma);

	const grouped = assets.reduce<Record<string, TAssetWithDetails[]>>(
		(acc, asset) => {
			const portfolioName = asset.portfolio.name;

			if (!acc[portfolioName]) {
				acc[portfolioName] = [];
			}

			acc[portfolioName].push({
				id: asset.id,
				name: asset.asset.name,
				type: asset.asset.type,
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
