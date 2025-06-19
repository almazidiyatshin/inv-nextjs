'use client';

import {
	Badge,
	Button,
	ButtonGroup,
	Card,
	FormatNumber,
	Group,
	HStack,
	Loader,
	Stat,
} from '@chakra-ui/react';
import { MyLineChart } from './components/MyLineChart';
import { ECandleInterval } from 'shared/constants';
import { toRub } from 'shared/utils';
import { TAssetCardProps } from './types';
import { useModel } from './useModel';

export const AssetCard = ({ id, title, value, counts }: TAssetCardProps) => {
	const {
		prevValue,
		isLoading,
		diff,
		t,
		texts,
		filters,
		dataset,
		handleRangeClick,
	} = useModel({ id, value, counts });

	if (!prevValue) {
		return <Loader />;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Card.Root minWidth={'xs'} flex={'1'}>
			<Card.Header>
				<Stat.Root>
					<HStack alignItems={'start'} justify={'space-between'}>
						<Group display={'block'}>
							<Stat.Label>{title}</Stat.Label>
							<HStack>
								<Stat.ValueText>
									<FormatNumber
										value={value}
										style="currency"
										currency="RUB"
										currencyDisplay="narrowSymbol"
									/>
								</Stat.ValueText>
								<Badge
									colorPalette={value < prevValue ? 'red' : 'green'}
									gap="0"
								>
									{value < prevValue ? (
										<Stat.DownIndicator />
									) : (
										<Stat.UpIndicator />
									)}
									{(diff > 0 ? '+' : '') +
										((diff / prevValue) * 100).toFixed(0) +
										'%'}
								</Badge>
							</HStack>
							<Stat.HelpText>{`${diff > 0 ? '+' : ''}${toRub(diff)} ${t('to')} ${texts[filters.interval]}`}</Stat.HelpText>
						</Group>
						<ButtonGroup size={'xs'}>
							<Button
								variant={
									filters.interval === ECandleInterval.YEAR
										? 'outline'
										: 'ghost'
								}
								title={t('year')}
								onClick={handleRangeClick(ECandleInterval.YEAR)}
							>
								{t('1Y')}
							</Button>

							<Button
								variant={
									filters.interval === ECandleInterval.FIVE_YEARS
										? 'outline'
										: 'ghost'
								}
								title={t('fiveYears')}
								onClick={handleRangeClick(ECandleInterval.FIVE_YEARS)}
							>
								{t('5Y')}
							</Button>

							<Button
								variant={
									filters.interval === ECandleInterval.TEN_YEARS
										? 'outline'
										: 'ghost'
								}
								title={t('tenYears')}
								onClick={handleRangeClick(ECandleInterval.TEN_YEARS)}
							>
								{t('10Y')}
							</Button>
						</ButtonGroup>
					</HStack>
				</Stat.Root>
			</Card.Header>

			<Card.Body>
				<MyLineChart dataset={dataset} />
			</Card.Body>
		</Card.Root>
	);
};
