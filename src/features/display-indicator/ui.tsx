"use client";

import { Card, HStack, Icon, Stat } from "@chakra-ui/react";
import { LuDollarSign } from "react-icons/lu";
import type { TIndicatorCardProps } from "./types";

export const IndicatorCard = ({ title, value }: TIndicatorCardProps) => {
	return (
		<Card.Root minWidth={"190px"} flex={"1"}>
			<Card.Body>
				<Stat.Root>
					<HStack justify="space-between">
						<Stat.Label>{title}</Stat.Label>
						<Icon color="fg.muted">
							<LuDollarSign />
						</Icon>
					</HStack>
					<Stat.ValueText>{value}</Stat.ValueText>
				</Stat.Root>
			</Card.Body>
		</Card.Root>
	);
};
