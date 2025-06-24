"use client";

import { Card, HStack, Stat } from "@chakra-ui/react";
import { Asset } from "entity";
import { AssetChart, AssetRangeFilter } from "feature";
import { EAssetId } from "shared/constants";
import { useModel } from "./useModel";

export const Bonds = () => {
	const { title, value, isNegative, persent, description, isLoading, dataset } =
		useModel();

	return (
		<Card.Root minWidth={"xs"} flex={"1"}>
			<Card.Header>
				<Stat.Root>
					<HStack alignItems={"start"} justify={"space-between"}>
						<Asset
							title={title}
							value={value}
							isNegative={isNegative}
							isLoading={isLoading}
							persent={persent}
							description={description}
						/>
						<AssetRangeFilter id={EAssetId.BONDS} isDisabled={isLoading} />
					</HStack>
				</Stat.Root>
			</Card.Header>
			<Card.Body>
				<AssetChart
					dataset={dataset}
					isNegative={isNegative}
					isLoading={isLoading}
				/>
			</Card.Body>
		</Card.Root>
	);
};
