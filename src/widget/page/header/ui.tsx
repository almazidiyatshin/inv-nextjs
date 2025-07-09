"use client";

import { Flex, Heading, Highlight, HStack } from "@chakra-ui/react";
import { NavBar } from "shared/ui";
import { Menu } from "widget";
import { useModel } from "./useModel";

export const Header = () => {
	const { texts } = useModel();

	return (
		<Flex
			align={"center"}
			justify={"space-between"}
			marginBottom={{ base: 6, smDown: 4 }}
			wrap={{ base: "wrap", smDown: "wrap-reverse" }}
		>
			<HStack gap={"4"} align={"baseline"}>
				<Heading size={"xl"}>
					<Highlight query={texts.title} styles={{ color: "teal.solid" }}>
						{texts.title}
					</Highlight>
				</Heading>
				<HStack gap={"4"} display={{ base: "flex", smDown: "none" }}>
					<NavBar />
				</HStack>
			</HStack>
			<Menu />
		</Flex>
	);
};
