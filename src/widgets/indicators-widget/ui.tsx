"use client";

import { Flex, For } from "@chakra-ui/react";
import { IndicatorCard } from "features";
import { memo } from "react";
import type { TIndicatorsWidgetProps } from "./types";
import { useModel } from "./useModel";

export const IndicatorsWidget = memo<TIndicatorsWidgetProps>((props) => {
	const { paramsConfig } = useModel(props);

	return (
		<Flex wrap={"wrap"} gap={"4"} marginY={"4"}>
			<For each={paramsConfig}>
				{(config) => <IndicatorCard key={config.id} {...config} />}
			</For>
		</Flex>
	);
});

IndicatorsWidget.displayName = "IndicatorsWidget";
