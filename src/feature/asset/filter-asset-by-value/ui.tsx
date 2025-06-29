"use client";

import { Field, HStack, RadioGroup } from "@chakra-ui/react";
import { EValueType } from "shared/constants";
import type { TAssetValueFilterProps } from "./types";
import { useModel } from "./useModel";

export const AssetValueFilter = ({
	id,
	isDisabled,
}: TAssetValueFilterProps) => {
	const { texts, items, handleChange } = useModel({
		id,
	});

	return (
		<Field.Root>
			<Field.Label>{texts.label}</Field.Label>
			<RadioGroup.Root
				variant={"subtle"}
				defaultValue={EValueType.ASSET}
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
