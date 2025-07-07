"use client";

import { Skeleton, Stat, Text } from "@chakra-ui/react";
import type { TIndicatorProps } from "./types";

export const Indicator = ({ title, value, isLoading }: TIndicatorProps) => {
	return (
		<Stat.Root>
			<Stat.Label>{title}</Stat.Label>
			<Stat.ValueText>
				{isLoading || !value ? (
					<Skeleton marginTop={"3"} height="5" width="80%" />
				) : (
					<Text>{value}</Text>
				)}
			</Stat.ValueText>
		</Stat.Root>
	);
};
