"use client";

import { Field, HStack, RadioGroup } from "@chakra-ui/react";
import { ECandleInterval } from "shared/constants";
import type { TAssetRangeFilterProps } from "./types";
import { useModel } from "./useModel";

export const AssetRangeFilter = ({
	id,
	isDisabled,
}: TAssetRangeFilterProps) => {
	const { texts, items, handleChange } = useModel({
		id,
	});

	return (
		<Field.Root>
			<Field.Label color={"gray.500"}>{texts.label}</Field.Label>
			<RadioGroup.Root
				defaultValue={ECandleInterval.YEAR}
				variant={"subtle"}
				size={"sm"}
				disabled={isDisabled}
				onValueChange={handleChange}
			>
				<HStack gap="6">
					{items.map((item) => (
						<RadioGroup.Item
							key={item.value}
							value={item.value}
							textAlign={"start"}
							cursor={isDisabled ? "disabled" : "pointer"}
						>
							<RadioGroup.ItemHiddenInput />
							<RadioGroup.ItemIndicator
								cursor={isDisabled ? "disabled" : "pointer"}
							/>
							<RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
						</RadioGroup.Item>
					))}
				</HStack>
			</RadioGroup.Root>
		</Field.Root>
	);
};
