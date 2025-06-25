"use client";

import {
	Badge,
	Group,
	HStack,
	Skeleton,
	Stack,
	Stat,
	Text,
} from "@chakra-ui/react";
import { Clipboard } from "shared/ui";
import type { TAssetProps } from "./types";
import { useModel } from "./useModel";

export const Asset = ({
	title,
	value,
	isNegative,
	isLoading,
	persent,
	description,
}: TAssetProps) => {
	const { formattedValue, handleCopy } = useModel({ value });

	return (
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
						<Stat.ValueText alignItems={"center"}>
							<Text>{formattedValue}</Text>
							<Clipboard value={formattedValue} onCopy={handleCopy} />
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
};
