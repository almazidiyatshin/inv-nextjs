"use client";

import { Flex, Heading } from "@chakra-ui/react";
import {
	AllAssetsChart,
	Bonds,
	BondsChart,
	Gold,
	Indicators,
	Shares,
	SharesChart,
} from "widget";
import { useModel } from "./useModel";

export const DashboardPage = () => {
	const { texts } = useModel();

	return (
		<Flex direction={"column"} gap={4}>
			<Heading as={"h1"} size={"4xl"}>
				{texts.dashboard}
			</Heading>

			<Indicators />

			<Flex wrap={"wrap"} gap={"4"}>
				<Shares />
				<Bonds />
				<Gold />
			</Flex>

			<Flex wrap={"wrap"} gap={"4"}>
				<AllAssetsChart />
				<SharesChart />
				<BondsChart />
			</Flex>
		</Flex>
	);
};
