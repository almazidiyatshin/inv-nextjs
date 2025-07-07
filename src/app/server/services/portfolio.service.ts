import { getServerSession } from "next-auth";
import type { TPostCreatePortfolioApiParams } from "shared/api";
import { getPrismaClient } from "../lib";
import { getAll, getByName, save } from "../repositories/portfolio.repository";

export async function getAllPortfolios() {
	const session = await getServerSession();
	const isProd =
		process.env.NODE_ENV === "production" &&
		session?.user.email === process.env.ADMIN_EMAIL;
	const prisma = getPrismaClient(isProd);

	const allPortfolios = await getAll(prisma);

	return allPortfolios;
}

export async function createPortfolio({
	name,
	type,
}: TPostCreatePortfolioApiParams) {
	const session = await getServerSession();
	const isProd =
		process.env.NODE_ENV === "production" &&
		session?.user.email === process.env.ADMIN_EMAIL;
	const prisma = getPrismaClient(isProd);

	const existingPortfolio = await getByName(prisma, name);

	if (existingPortfolio) {
		throw new Error(`Портфель "${name}" уже существует.`);
	}

	const newPortfolio = await save(prisma, { name, type });

	return newPortfolio;
}
