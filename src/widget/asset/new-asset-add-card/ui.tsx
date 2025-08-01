"use client";

import {
	Box,
	Card,
	EmptyState,
	Flex,
	Skeleton,
	Stack,
	VStack,
} from "@chakra-ui/react";
import { AddAssetsForm } from "feature";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { useModel } from "./useModel";

export const AssetAddCard = () => {
	const { texts, isActive, isLoading } = useModel();

	return (
		<Card.Root minWidth={"xs"} flex={"1"} colorPalette={"teal"}>
			<Card.Body gap="4">
				<Card.Title mt="2">{texts.title}</Card.Title>
				<Box padding={"4"}>
					{isLoading ? (
						<Stack gap={"5"}>
							<Stack gap={"2"}>
								<Skeleton height={"5"} width="40%" />
								<Skeleton height={"8"} width="100%" />
							</Stack>
							<Stack gap={"2"}>
								<Skeleton height={"5"} width="40%" />
								<Skeleton height={"8"} width="100%" />
							</Stack>
							<Flex justify={"flex-end"}>
								<Skeleton height={"10"} width="40%" />
							</Flex>
						</Stack>
					) : isActive ? (
						<AddAssetsForm />
					) : (
						<EmptyState.Root size={"md"}>
							<EmptyState.Content>
								<EmptyState.Indicator>
									<LuBriefcaseBusiness />
								</EmptyState.Indicator>
								<VStack textAlign="center">
									<EmptyState.Title>{texts.noPortfolios}</EmptyState.Title>
									<EmptyState.Description>
										{texts.createPortfolio}
									</EmptyState.Description>
								</VStack>
							</EmptyState.Content>
						</EmptyState.Root>
					)}
				</Box>
			</Card.Body>
		</Card.Root>
	);
};
