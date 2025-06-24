import { useTInvestApi } from "shared/api";
import { EAssetId, etfIds, sharesIds } from "shared/constants";

export const fetchCallbacks = {
	[EAssetId.SHARES]: [
		{ id: etfIds.TMOS, fetch: useTInvestApi.postTmos },
		{ id: sharesIds.BELU, fetch: useTInvestApi.postBelu },
		{ id: sharesIds.CHMF, fetch: useTInvestApi.postChmf },
		{ id: sharesIds.MAGN, fetch: useTInvestApi.postMagn },
		{ id: sharesIds.MGNT, fetch: useTInvestApi.postMgnt },
		{ id: sharesIds.NLMK, fetch: useTInvestApi.postNlmk },
	],
	[EAssetId.BONDS]: [
		{ id: etfIds.TBRU, fetch: useTInvestApi.postTbru },
		{ id: etfIds.TLCB, fetch: useTInvestApi.postTlcb },
		{ id: etfIds.TOFZ, fetch: useTInvestApi.postTofz },
	],
	[EAssetId.GOLD]: [{ id: etfIds.TGLD, fetch: useTInvestApi.postTgld }],
};
