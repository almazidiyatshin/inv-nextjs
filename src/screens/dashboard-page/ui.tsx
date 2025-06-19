'use client';

import { Flex, Heading, Loader, Highlight, Group } from '@chakra-ui/react';
import {
	AssetsWidget,
	ChartsWidget,
	MenuWidget,
	IndicatorsWidget,
} from 'widgets';
import { TDashboardPageProps } from './types';
import { useModel } from './useModel';
import { SessionProvider } from 'next-auth/react';
// import { AddAssetsDataButton } from 'features/add-assets-data';

export const DashboardPage = ({ locale }: TDashboardPageProps) => {
	const { isLoading, portfolioData, indicatorsData, moexIndex, t } = useModel({
		locale,
	});

	if (isLoading || !portfolioData || !indicatorsData || !moexIndex) {
		return <Loader />;
	}

	return (
		<SessionProvider>
			<Flex
				align={'center'}
				justify={'space-between'}
				marginBottom={{ base: 6, smDown: 4 }}
				wrap={{ base: 'wrap', smDown: 'wrap-reverse' }}
			>
				<Heading as={'h1'} size={'4xl'}>
					<Highlight query={t('investly')} styles={{ color: 'teal.600' }}>
						{t('investly')}
					</Highlight>
				</Heading>
				<Group>
					{/* <AddAssetsDataButton /> */}
					<MenuWidget />
				</Group>
			</Flex>

			<IndicatorsWidget
				portfolioData={portfolioData}
				indicatorsData={indicatorsData}
				moexIndex={moexIndex}
			/>
			<AssetsWidget data={portfolioData} />
			<ChartsWidget data={portfolioData} />
		</SessionProvider>
	);
};
