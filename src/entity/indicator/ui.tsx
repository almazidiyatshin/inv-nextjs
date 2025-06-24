"use client";

import {
	Card,
	FormatNumber,
	HStack,
	Icon,
	LocaleProvider,
	Skeleton,
	Stat,
	Text,
} from "@chakra-ui/react";
import type { TIndicatorProps } from "./types";
import { useModel } from "./useModel";

export const Indicator = ({
	title,
	value,
	isLoading,
	type,
}: TIndicatorProps) => {
	const { valueProps, icon: IconComponent } = useModel({ type });

	return (
		<Card.Root minWidth={"190px"} flex={"1"}>
			<Card.Body>
				<Stat.Root>
					<HStack justify="space-between">
						<Stat.Label>{title}</Stat.Label>
						<Icon color="fg.muted">
							<IconComponent />
						</Icon>
					</HStack>
					<Stat.ValueText>
						{isLoading || !value ? (
							<Skeleton marginTop={"3"} height="5" width="80%" />
						) : type ? (
							<LocaleProvider locale="ru-RU">
								<FormatNumber {...valueProps} value={value as number} />
							</LocaleProvider>
						) : (
							<Text>{value}</Text>
						)}
					</Stat.ValueText>
				</Stat.Root>
			</Card.Body>
		</Card.Root>
	);
};
