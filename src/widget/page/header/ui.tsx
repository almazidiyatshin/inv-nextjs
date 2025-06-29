"use client";

import { Flex, Group, Heading, Highlight } from "@chakra-ui/react";
// import { AddAssetsDataButton } from "feature";
import { Menu } from "widget";
import type { THeaderProps } from "./types";
import { useModel } from "./useModel";

export const Header = ({ locale }: THeaderProps) => {
	const { title } = useModel({
		locale,
	});

	return (
		<Flex
			align={"center"}
			justify={"space-between"}
			marginBottom={{ base: 6, smDown: 4 }}
			wrap={{ base: "wrap", smDown: "wrap-reverse" }}
		>
			<Heading as={"h1"} size={"3xl"}>
				<Highlight query={title} styles={{ color: "teal.600" }}>
					{title}
				</Highlight>
			</Heading>
			<Group>
				{/* <AddAssetsDataButton /> */}
				<Menu />
			</Group>
		</Flex>
	);
};
