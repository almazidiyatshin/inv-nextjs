import {
	TGetIndicatorsApiReturn,
	TGetMoexIndexApiReturn,
} from 'shared/api/common-api/types';
import { TPostPortfolioData } from 'shared/api/tInvest-api/types';

export type TIndicatorsWidgetProps = {
	portfolioData: TPostPortfolioData;
	indicatorsData: TGetIndicatorsApiReturn;
	moexIndex: TGetMoexIndexApiReturn;
};
