"use client";

import { Flex, For } from "@chakra-ui/react";
import { ChartCard } from "features";
import { memo } from "react";
import type { TChartsWidgetProps } from "./types";
import { useModel } from "./useModel";

export const ChartsWidget = memo<TChartsWidgetProps>(({ data }) => {
	const { chartsCongif } = useModel({ data });

	return (
		<Flex wrap={"wrap"} gap={"4"} marginY={"4"}>
			<For each={chartsCongif}>
				{({ title, dataSet }) => (
					<ChartCard key={title} title={title} dataSet={dataSet} />
				)}
			</For>
		</Flex>
	);
});

ChartsWidget.displayName = "ChartsWidget";
