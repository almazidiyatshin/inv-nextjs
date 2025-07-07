import type { EAssetType } from "@prisma/client";

export type TAssetDbInput = {
	name: string;
	type?: EAssetType;
	portfolio: number;
	quantity: number;
	price: number;
};
