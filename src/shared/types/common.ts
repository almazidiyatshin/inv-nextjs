export type TAssetData = {
	priceInt: number;
	priceNano: number;
	units: number;
};

export type TIndicatorsData = string[];
export type TMoexIndex = string;

export type TPortfolioData = {
	allSharesSum: number;
	allBondsSum: number;
	goldSum: number;
	totalSum: number;
	tbruSum: number;
	tlcbSum: number;
	tofzSum: number;
	tmosSum: number;
	otherSharesSum: number;
	tgldCount: number;
	tbruCount: number;
	tlcbCount: number;
	tofzCount: number;
	tmosCount: number;
	beluCount: number;
	chmfCount: number;
	magnCount: number;
	mgntCount: number;
	nlmkCount: number;
	expectedYield: number;
};
