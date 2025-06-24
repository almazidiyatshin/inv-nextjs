"use client";

import { Flex } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import {
	AllAssetsChart,
	Bonds,
	BondsChart,
	Gold,
	Header,
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
// import { AddAssetsDataButton } from 'features/add-assets-data';

export const DashboardPage = ({ locale }: TDashboardPageProps) => {
	return (
		<SessionProvider>
			<Header locale={locale} />

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
