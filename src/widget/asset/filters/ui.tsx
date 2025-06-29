import {
	Collapsible,
	For,
	HStack,
	IconButton,
	Tag,
	VStack,
} from "@chakra-ui/react";
import { LuFilter, LuFilterX, LuListFilter } from "react-icons/lu";
import { Tooltip } from "shared/ui";
import { config } from "./config";
import type { TAssetFiltersProps } from "./types";
import { useModel } from "./useModel";

export const AssetFilters = ({ id, isLoading }: TAssetFiltersProps) => {
	const { isOpen, texts, tags, handleChange } = useModel({ id });

	return (
		<>
			{!isOpen && (
				<HStack>
					<For each={tags}>
						{({ label, value }, index) => (
							<Tag.Root variant={"subtle"} key={index}>
								<Tag.StartElement>
									<LuListFilter />
								</Tag.StartElement>
								<Tag.Label>{`${label}: ${value}`}</Tag.Label>
							</Tag.Root>
						)}
					</For>
				</HStack>
			)}

			<Collapsible.Root
				open={isOpen}
				textAlign={"end"}
				onOpenChange={handleChange}
			>
				<Collapsible.Trigger position={"absolute"} top={"4"} right={"4"}>
					<Tooltip content={texts.filters}>
						<IconButton
							size={"sm"}
							variant={"ghost"}
							aria-label={texts.filters}
						>
							{isOpen ? <LuFilterX /> : <LuFilter />}
						</IconButton>
					</Tooltip>
				</Collapsible.Trigger>

				<Collapsible.Content
					padding={"4"}
					background={"gray.subtle"}
					borderRadius={"6px"}
				>
					<VStack gap={"4"}>
						<For each={config[id]}>
							{({ disabled, Component }, index) => (
								<Component
									key={index}
									id={id}
									isDisabled={disabled || isLoading}
								/>
							)}
						</For>
					</VStack>
				</Collapsible.Content>
			</Collapsible.Root>
		</>
	);
};
