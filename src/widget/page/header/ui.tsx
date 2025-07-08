"use client";

import {
	Link as ChakraLink,
	Flex,
	Heading,
	Highlight,
	HStack,
} from "@chakra-ui/react";
import { Link } from "shared/lib/i18n/navigation";
import { Menu } from "widget";
import { useModel } from "./useModel";

export const Header = () => {
	const { texts, currentPath } = useModel();

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
					<ChakraLink
						asChild
						fontWeight={currentPath === "dashboard" ? "bold" : "normal"}
						_focus={{
							outline: "none",
						}}
					>
						<Link href="/dashboard">{texts.dashboard}</Link>
					</ChakraLink>
					<ChakraLink
						asChild
						fontWeight={
							currentPath === "portfolio-management" ? "bold" : "normal"
						}
						_focus={{
							outline: "none",
						}}
					>
						<Link href="/portfolio-management">
							{texts.portfolioManagement}
						</Link>
					</ChakraLink>
				</HStack>
			</HStack>
			<Menu />
		</Flex>
	);
};
