import type { TPostCreatePortfolioApiParams } from "shared/api";
import type { TPrismaExtendedClient } from "../lib";

export async function getAll(prisma: TPrismaExtendedClient) {
	const portfolios = await prisma.portfolio.findMany();

	return portfolios;
}

export async function getByName(prisma: TPrismaExtendedClient, name: string) {
	const portfolio = await prisma.portfolio.findUnique({
		where: {
			name,
		},
	});

	return portfolio;
}

export async function save(
	prisma: TPrismaExtendedClient,
	data: TPostCreatePortfolioApiParams,
) {
	const portfolio = await prisma.portfolio.create({
		data,
	});

	return portfolio;
}
