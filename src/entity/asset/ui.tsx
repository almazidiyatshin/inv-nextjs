"use client";

import {
	Badge,
	FormatNumber,
	Group,
	HStack,
	LocaleProvider,
	Skeleton,
	Stack,
	Stat,
} from "@chakra-ui/react";
import type { TAssetProps } from "./types";

export const Asset = ({
	title,
	value,
	isNegative,
	isLoading,
	persent,
	description,
}: TAssetProps) => (
	<Group display={"block"}>
		<Stat.Label>{title}</Stat.Label>
		{isLoading ? (
			<Stack marginTop={"2"} flex="1">
				<Skeleton height={"5"} width="260%" />
				<Skeleton height={"5"} width="200%" />
			</Stack>
		) : (
			<>
				<HStack>
					<Stat.ValueText>
						<LocaleProvider locale="ru-RU">
							<FormatNumber
								value={Number(value.toFixed(0))}
								style="currency"
								currency="RUB"
								currencyDisplay="narrowSymbol"
							/>
						</LocaleProvider>
					</Stat.ValueText>
					<Badge colorPalette={isNegative ? "red" : "green"} gap="0">
						{isNegative ? <Stat.DownIndicator /> : <Stat.UpIndicator />}
						{persent}
					</Badge>
				</HStack>
				<Stat.HelpText>{description}</Stat.HelpText>
			</>
		)}
	</Group>
);
