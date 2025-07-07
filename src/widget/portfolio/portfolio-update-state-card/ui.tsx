"use client";

import {
	Card,
	EmptyState,
	For,
	HStack,
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
					<Stack gap={"4"}>
						<HStack gap={"2"}>
							<Skeleton height={"8"} width="100%" flex={1} />
							<Skeleton height={"8"} width="100%" flex={1} />
							<Skeleton height={"8"} width="100%" flex={1} />
						</HStack>
					</Stack>
				) : isActive ? (
					<Tabs.Root
						fitted
						lazyMount={true}
						unmountOnExit={true}
						variant={"outline"}
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
									<Tabs.Content key={portfolioName} value={portfolioName}>
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
