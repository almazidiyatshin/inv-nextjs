"use client";

import {
	Card,
	EmptyState,
	Flex,
	For,
	SimpleGrid,
	Skeleton,
	Stack,
	Tabs,
	VStack,
} from "@chakra-ui/react";
import { UpdatePortfolioStateForm } from "feature";
import { LuReceipt } from "react-icons/lu";
import { useModel } from "./useModel";

export const PortfolioUpdateStateCard = () => {
	const { texts, isActive, data, isLoading } = useModel();

	return (
		<Card.Root width={"100%"} colorPalette={"teal"}>
			<Card.Body gap="4">
				<Card.Title mt="2">{texts.title}</Card.Title>
				{isLoading ? (
					<Stack gap={"6"}>
						<Skeleton height={"8"} width="100%" marginTop={"2"} />
						<SimpleGrid columns={3} gap={"8"} width={"full"} padding={"4"}>
							{[1, 2, 3].map((item) => (
								<Stack key={item}>
									<Stack gap={"5"}>
										<Stack gap={"2"}>
											<Skeleton height={"5"} width="40%" />
											<Skeleton height={"8"} width="100%" />
										</Stack>
										<Stack gap={"2"}>
											<Skeleton height={"5"} width="40%" />
											<Skeleton height={"8"} width="100%" />
										</Stack>
									</Stack>
								</Stack>
							))}
						</SimpleGrid>
						<Flex justify={"flex-end"} paddingX={"4"} paddingBottom={"4"}>
							<Skeleton height={"10"} width="20%" />
						</Flex>
					</Stack>
				) : isActive ? (
					<Tabs.Root
						fitted
						lazyMount={true}
						unmountOnExit={true}
						variant={"line"}
						defaultValue={Object.keys(data)[0]}
					>
						<Tabs.List>
							<For each={Object.keys(data)}>
								{(portfolioName) => (
									<Tabs.Trigger key={portfolioName} value={portfolioName}>
										{portfolioName}
									</Tabs.Trigger>
								)}
							</For>
						</Tabs.List>

						{
							<For each={Object.entries(data)}>
								{([portfolioName, assets]) => (
									<Tabs.Content
										key={portfolioName}
										value={portfolioName}
										paddingTop={"8"}
										paddingBottom={"4"}
										paddingX={"4"}
									>
										<UpdatePortfolioStateForm assets={assets} />
									</Tabs.Content>
								)}
							</For>
						}
					</Tabs.Root>
				) : (
					<EmptyState.Root size={"md"}>
						<EmptyState.Content>
							<EmptyState.Indicator>
								<LuReceipt />
							</EmptyState.Indicator>
							<VStack textAlign="center">
								<EmptyState.Title>{texts.noAssets}</EmptyState.Title>
								<EmptyState.Description>
									{texts.createAssets}
								</EmptyState.Description>
							</VStack>
						</EmptyState.Content>
					</EmptyState.Root>
				)}
			</Card.Body>
		</Card.Root>
	);
};
