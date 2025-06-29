"use client";

import { Card, Stat } from "@chakra-ui/react";
import { Asset } from "entity";
import { AssetChart } from "feature";
import { EAssetId } from "shared/constants";
import { AssetFilters } from "../filters";
import { useModel } from "./useModel";

export const Shares = () => {
	const { title, value, isNegative, persent, description, isLoading, dataset } =
		useModel();

	return (
		<Card.Root minWidth={"xs"} flex={"1"}>
			<Card.Header gap={"4"}>
				<Stat.Root>
					<Asset
						title={title}
						value={value}
						isNegative={isNegative}
						isLoading={isLoading}
						persent={persent}
						description={description}
					/>
				</Stat.Root>
				<AssetFilters id={EAssetId.T_BONDS} isLoading={isLoading} />
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
