"use client";

import { Button, ButtonGroup } from "@chakra-ui/react";
import { ECandleInterval } from "shared/constants";
import type { TAssetRangeFilterProps } from "./types";
import { useModel } from "./useModel";

export const AssetRangeFilter = ({
	id,
	isDisabled,
}: TAssetRangeFilterProps) => {
	const {
		yearLabel,
		fiveYearsLabel,
		tenYearsLabel,
		yearButtonTitle,
		fiveYearsButtonTitle,
		tenYearsButtonTitle,
		yearButtonType,
		fiveYearsButtonType,
		tenYearsButtonType,
		handleRangeClick,
	} = useModel({
		id,
	});

	return (
		<ButtonGroup size={"xs"}>
			<Button
				variant={yearButtonType}
				title={yearButtonTitle}
				disabled={isDisabled}
				onClick={handleRangeClick(ECandleInterval.YEAR)}
			>
				{yearLabel}
			</Button>

			<Button
				variant={fiveYearsButtonType}
				title={fiveYearsButtonTitle}
				disabled={isDisabled}
				onClick={handleRangeClick(ECandleInterval.FIVE_YEARS)}
			>
				{fiveYearsLabel}
			</Button>

			<Button
				variant={tenYearsButtonType}
				title={tenYearsButtonTitle}
				disabled={isDisabled}
				onClick={handleRangeClick(ECandleInterval.TEN_YEARS)}
			>
				{tenYearsLabel}
			</Button>
		</ButtonGroup>
	);
};
