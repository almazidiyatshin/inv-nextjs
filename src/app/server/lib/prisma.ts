import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export const getPrismaClient = (isProd: boolean) => {
	const url = isProd
		? process.env.PRISMA_DATABASE_URL
		: process.env.DEV_PRISMA_DATABASE_URL;

	if (!url) throw new Error("Missing DB url");

	return new PrismaClient({
		datasources: {
			db: { url },
		},
	}).$extends(withAccelerate());
};

export type TPrismaExtendedClient = ReturnType<typeof getPrismaClient>;
