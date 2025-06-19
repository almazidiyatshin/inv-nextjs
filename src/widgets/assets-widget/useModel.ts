import { EAssetIds, etfIds, sharesIds } from "shared/constants";
import { useTranslation } from "shared/lib";
import type { TAssetsWidgetProps } from "./types";

export const useModel = ({ data }: TAssetsWidgetProps) => {
	const t = useTranslation();

	const {
		allSharesSum,
		allBondsSum,
		goldSum,
		tgldCount,
		tbruCount,
		tlcbCount,
		tofzCount,
		tmosCount,
		beluCount,
		chmfCount,
		magnCount,
		mgntCount,
		nlmkCount,
	} = data;

	const assetsConfig = [
		{
			id: EAssetIds.SHARES,
			title: t("allSharesValue"),
			value: allSharesSum,
			counts: [
				{ [etfIds.TMOS]: Number(tmosCount) },
				{ [sharesIds.BELU]: Number(beluCount) },
				{ [sharesIds.CHMF]: Number(chmfCount) },
				{ [sharesIds.MAGN]: Number(magnCount) },
				{ [sharesIds.MGNT]: Number(mgntCount) },
				{ [sharesIds.NLMK]: Number(nlmkCount) },
			],
		},
		{
			id: EAssetIds.BONDS,
			title: t("allBondsValue"),
			value: allBondsSum,
			counts: [
				{ [etfIds.TBRU]: Number(tbruCount) },
				{ [etfIds.TLCB]: Number(tlcbCount) },
				{ [etfIds.TOFZ]: Number(tofzCount) },
			],
		},
		{
			id: EAssetIds.GOLD,
			title: t("goldValue"),
			value: goldSum,
			counts: [{ [etfIds.TGLD]: Number(tgldCount) }],
		},
	];

	return { assetsConfig };
};
