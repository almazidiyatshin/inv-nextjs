import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export const getPrismaClient = (isProd: boolean) => {
	const url = isProd ? process.env.DATABASE_URL : process.env.DEV_DATABASE_URL;

	if (!url) throw new Error("Missing DATABASE_URL");

	return new PrismaClient({
		datasources: {
			db: { url },
		},
	}).$extends(withAccelerate());
};

export type TPrismaExtendedClient = ReturnType<typeof getPrismaClient>;
