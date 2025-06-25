"use client";

import { SegmentGroup } from "@chakra-ui/react";
import { ECandleInterval } from "shared/constants";
import type { TAssetRangeFilterProps } from "./types";
import { useModel } from "./useModel";

export const AssetRangeFilter = ({
	id,
	isDisabled,
}: TAssetRangeFilterProps) => {
	const { items, handleRangeClick } = useModel({
		id,
	});

	return (
		<SegmentGroup.Root
			orientation="vertical"
			defaultValue={ECandleInterval.YEAR}
			size={"xs"}
			disabled={isDisabled}
			onValueChange={handleRangeClick}
		>
			<SegmentGroup.Indicator />
			<SegmentGroup.Items items={items} />
		</SegmentGroup.Root>
	);
};
