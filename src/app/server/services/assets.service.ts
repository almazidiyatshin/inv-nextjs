import type { AssetCurrentState } from "@prisma/client";
import { getServerSession } from "next-auth";
import type {
	TPostCreateAssetApiParams,
	TPutUpdateAssetApiParams,
} from "shared/api";
import { getPrismaClient } from "../lib";
import {
	getAllAssetCurrentStates,
	getByPortfolioIdAndName,
	save,
} from "../repositories/assets.repository";

export async function getAllAssets() {
	const session = await getServerSession();
	const isProd =
		process.env.NODE_ENV === "production" &&
		session?.user.email === process.env.ADMIN_EMAIL;
	const prisma = getPrismaClient(isProd);

	const assets = await getAllAssetCurrentStates(prisma);

	const grouped = assets.reduce<Record<string, AssetCurrentState[]>>(
		(acc, asset) => {
			const portfolioName = asset.portfolio.name;

			if (!acc[portfolioName]) {
				acc[portfolioName] = [];
			}

			acc[portfolioName].push({
				id: asset.id,
				name: asset.name,
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

	const existingAsset = await getByPortfolioIdAndName(
		prisma,
		body.name,
		body.portfolio,
	);

	if (existingAsset) {
		throw new Error(`Актив "${body.name}" уже существует.`);
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
