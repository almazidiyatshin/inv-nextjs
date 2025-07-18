"use client";

import { Flex, Heading } from "@chakra-ui/react";
import {
	AllAssetsChart,
	Bonds,
	BondsChart,
	Gold,
	Shares,
	SharesChart,
} from "widget";
import {
	AllAssetsValue,
	InflationRate,
	KeyRate,
	MoexIndex,
	UsdExchangeRate,
} from "widget/indicator";
import { useModel } from "./useModel";

export const DashboardPage = () => {
	const { texts } = useModel();

	return (
		<>
			<Heading as={"h1"} size={"4xl"} marginY={"4"}>
				{texts.dashboard}
			</Heading>

			<Flex wrap={"wrap"} gap={"4"} marginY={"4"}>
				<AllAssetsValue />
				<MoexIndex />
				<InflationRate />
				<KeyRate />
				<UsdExchangeRate />
			</Flex>

			<Flex wrap={"wrap"} gap={"4"} marginY={"4"}>
				<Shares />
				<Bonds />
				<Gold />
			</Flex>

			<Flex wrap={"wrap"} gap={"4"} marginY={"4"}>
				<AllAssetsChart />
				<SharesChart />
				<BondsChart />
			</Flex>
		</>
	);
};
