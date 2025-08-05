"use client";

import { Box, Skeleton, Stat, Text, VStack } from "@chakra-ui/react";
import { AllValuesIndicatorFilter } from "feature";
import { useModel } from "./useModel";

export const AllAssetsValue = () => {
	const { value, isLoading } = useModel();

	return (
		<Box>
			<Stat.Root>
				<VStack align={"start"} gap={1}>
					<AllValuesIndicatorFilter />
					<Stat.ValueText w={"full"}>
						{isLoading ? (
							<Skeleton marginTop={"3"} height="5" width="80%" />
						) : (
							<Text>{value}</Text>
						)}
					</Stat.ValueText>
				</VStack>
			</Stat.Root>
		</Box>
	);
};
