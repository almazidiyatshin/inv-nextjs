import {
	EAssetCategory,
	EAssetName,
	EPortfolioName,
	EPortfolioType,
} from "@prisma/client";

export const assetTypes = {
	[EAssetName.EQMX]: EAssetCategory.SHARE,
	[EAssetName.OBLG]: EAssetCategory.BOND,
	[EAssetName.GOLD]: EAssetCategory.METAL,
	[EAssetName.SBMX]: EAssetCategory.SHARE,
	[EAssetName.SBCB]: EAssetCategory.BOND,
	[EAssetName.SBGB]: EAssetCategory.BOND,
	[EAssetName.SBGD]: EAssetCategory.METAL,
	[EAssetName.SBRB]: EAssetCategory.BOND,
	[EAssetName.USD]: EAssetCategory.MONEY,
	[EAssetName.RUB]: EAssetCategory.MONEY,
};

export const portfolioTypes = {
	[EPortfolioName.VTB]: EPortfolioType.BROKERAGE,
	[EPortfolioName.SBER]: EPortfolioType.BROKERAGE,
	[EPortfolioName.MONEY]: EPortfolioType.MONEY,
};

export const portfolioFields: { [key in EPortfolioName]: EAssetName[] } = {
	[EPortfolioName.VTB]: [EAssetName.EQMX, EAssetName.OBLG, EAssetName.GOLD],
	[EPortfolioName.SBER]: [
		EAssetName.SBMX,
		EAssetName.SBCB,
		EAssetName.SBGB,
		EAssetName.SBRB,
		EAssetName.SBGD,
	],
	[EPortfolioName.MONEY]: [EAssetName.USD, EAssetName.RUB],
};
