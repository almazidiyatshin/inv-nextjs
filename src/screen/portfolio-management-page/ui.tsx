"use client";

import { Flex, Heading, VStack } from "@chakra-ui/react";
import {
	AssetAddCard,
	PortfolioAddCard,
	PortfolioUpdateStateCard,
} from "widget";
import { useModel } from "./useModel";

export const PortfolioManagementPage = () => {
	const { texts } = useModel();

	return (
		<>
			<Heading as={"h1"} size={"4xl"} marginY={"4"}>
				{texts.portfolioManagement}
			</Heading>
			<VStack align={"start"} gap={"4"}>
				<Flex wrap={"wrap"} w={"100%"} justify={"space-between"} gap={"4"}>
					<PortfolioAddCard />
					<AssetAddCard />
				</Flex>
				<PortfolioUpdateStateCard />
			</VStack>
		</>
	);
};
