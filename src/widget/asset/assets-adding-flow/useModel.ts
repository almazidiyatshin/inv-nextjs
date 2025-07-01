import { EPortfolioName } from "@prisma/client";
import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();
	const texts = {
		buttonTitle: t("addData"),
		title: t("addAssetsData"),
	};

	const config = {
		[EPortfolioName.VTB]: {
			name: t("vtb"),
			value: EPortfolioName.VTB,
		},
		[EPortfolioName.SBER]: {
			name: t("sber"),
			value: EPortfolioName.SBER,
		},
		[EPortfolioName.MONEY]: {
			name: t("money"),
			value: EPortfolioName.MONEY,
		},
	};

	return { texts, config };
};
