import type { TIndicatorsData, TMoexIndex, TPortfolioData } from "shared/types";

export type TIndicatorsWidgetProps = {
	portfolioData: TPortfolioData;
	indicatorsData: TIndicatorsData;
	moexIndex: TMoexIndex;
};
