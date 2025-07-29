"use client";

import { Card, Skeleton, Stat, Text, VStack } from "@chakra-ui/react";
import { AllValuesIndicatorFilter } from "feature";
import { useModel } from "./useModel";

export const AllAssetsValue = () => {
	const { value, isLoading } = useModel();

	return (
		<Card.Root minWidth={"190px"} flex={"1"}>
			<Card.Body>
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
			</Card.Body>
		</Card.Root>
	);
};
