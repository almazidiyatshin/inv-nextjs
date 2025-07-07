"use client";

import { Card } from "@chakra-ui/react";
import { AddPortfolioForm } from "feature";
import { useModel } from "./useModel";

export const PortfolioAddCard = () => {
	const { texts } = useModel();

	return (
		<Card.Root minWidth={"xs"} flex={"1"} colorPalette={"teal"}>
			<Card.Body gap="4">
				<Card.Title mt="2">{texts.title}</Card.Title>
				<AddPortfolioForm />
			</Card.Body>
		</Card.Root>
	);
};
