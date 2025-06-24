"use client";

import { Flex, Group, Heading, Highlight } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import {
	AllAssetsChart,
	Bonds,
	BondsChart,
	Gold,
	MenuWidget,
	Shares,
	SharesChart,
} from "widget";
import {
	AllAssetsValue,
	InflationRate,
	KeyRate,
	MoexIndex,
} from "widget/indicator";
import type { TDashboardPageProps } from "./types";
import { useModel } from "./useModel";
// import { AddAssetsDataButton } from 'features/add-assets-data';

export const DashboardPage = ({ locale }: TDashboardPageProps) => {
	const { t } = useModel({
		locale,
	});

	return (
		<SessionProvider>
			<Flex
				align={"center"}
				justify={"space-between"}
				marginBottom={{ base: 6, smDown: 4 }}
				wrap={{ base: "wrap", smDown: "wrap-reverse" }}
			>
				<Heading as={"h1"} size={"3xl"}>
					<Highlight query={t("investly")} styles={{ color: "teal.600" }}>
						{t("investly")}
					</Highlight>
				</Heading>
				<Group>
					{/* <AddAssetsDataButton /> */}
					<MenuWidget />
				</Group>
			</Flex>

			<Flex wrap={"wrap"} gap={"4"} marginY={"4"}>
				<AllAssetsValue />
				<MoexIndex />
				<InflationRate />
				<KeyRate />
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
		</SessionProvider>
	);
};
