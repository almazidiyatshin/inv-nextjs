"use client";

import { Card, Flex, SkeletonCircle, Stat } from "@chakra-ui/react";
import { Chart } from "entity";
import { SharesChartFilter } from "feature/chart";
import { useModel } from "./useModel";

export const SharesChart = () => {
	const { dataSet, isLoading } = useModel();

	return (
		<Card.Root minWidth={"xl"} flex={"1"}>
			<Card.Header>
				<Stat.Root>
					<Stat.Label>
						<SharesChartFilter />
					</Stat.Label>
				</Stat.Root>
			</Card.Header>
			<Card.Body>
				{isLoading ? (
					<Flex justify={"center"} padding={"4"}>
						<SkeletonCircle size={"40"} />
					</Flex>
				) : (
					<Chart dataSet={dataSet} />
				)}
			</Card.Body>
		</Card.Root>
	);
};
