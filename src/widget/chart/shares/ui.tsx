import { Card, Flex, SkeletonCircle, Stat } from "@chakra-ui/react";
import { Chart } from "entity";
import { useModel } from "./useModel";

export const SharesChart = () => {
	const { title, dataSet, isLoading } = useModel();

	return (
		<Card.Root minWidth={"xs"} flex={"1"}>
			<Card.Header>
				<Stat.Root>
					<Stat.Label>{title}</Stat.Label>
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
