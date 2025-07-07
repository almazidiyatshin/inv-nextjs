export const etfIds = {
	TBRU: "e8acd2fb-6de6-4ea4-9bfb-0daad9b2ed7b",
	TMOS: "9654c2dd-6993-427e-80fa-04e80a1cf4da",
	TLCB: "2f243f46-34ce-4d50-a931-c6f8a67eb758",
	TGLD: "4c466956-d2ce-4a95-abb4-17947a65f18a",
	TOFZ: "c5049184-ded4-49d0-8e14-bffefc40a223",
};

export const sharesIds = {
	NLMK: "161eb0d0-aaac-4451-b374-f5d0eeb1b508",
	MAGN: "7132b1c9-ee26-4464-b5b5-1046264b61d9",
	BELU: "974077c4-d893-4058-9314-8f1b64a444b8",
	MGNT: "ca845f68-6c43-44bc-b584-330d2a1e5eb7",
	CHMF: "fa6aae10-b8d5-48c8-bbfd-d320d925d096",
};

export enum ECandleInterval {
	YEAR = "CANDLE_INTERVAL_YEAR",
	FIVE_YEARS = "CANDLE_INTERVAL_FIVE_YEARS",
	TEN_YEARS = "CANDLE_INTERVAL_TEN_YEARS",
}

export enum EAssetId {
	T_SHARES = "tShares",
	T_BONDS = "tBonds",
	T_GOLD = "tGold",
	VTB_SHARES = "vtbShares",
	VTB_BONDS = "vtbBonds",
	VTB_GOLD = "vtbGold",
	SBER_SHARES = "sberShares",
	SBER_BONDS = "sberBonds",
	SBER_GOLD = "sberGold",
}

export const LS_LOCALE_KEY = "dashboard:localeValue";

export enum EValueType {
	ASSET = "ASSET",
	PORTFOLIO = "PORTFOLIO",
}
