import type {
	TGetIndicatorsApiReturn,
	TGetMoexIndexApiReturn,
} from "shared/api/common-api/types";
import type { TPostPortfolioData } from "shared/api/tInvest-api/types";

export type TIndicatorsWidgetProps = {
	portfolioData: TPostPortfolioData;
	indicatorsData: TGetIndicatorsApiReturn;
	moexIndex: TGetMoexIndexApiReturn;
};
