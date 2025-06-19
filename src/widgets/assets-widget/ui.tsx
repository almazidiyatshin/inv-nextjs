"use client";

import { Flex, For } from "@chakra-ui/react";
import { AssetCard } from "features";
import { memo } from "react";
import type { TAssetsWidgetProps } from "./types";
import { useModel } from "./useModel";

export const AssetsWidget = memo<TAssetsWidgetProps>(({ data }) => {
	const { assetsConfig } = useModel({ data });

	return (
		<Flex wrap={"wrap"} gap={"4"} marginY={"4"}>
			<For each={assetsConfig}>
				{(config) => <AssetCard key={config.id} {...config} />}
			</For>
		</Flex>
	);
});

AssetsWidget.displayName = "AssetsWidget";
