import { Button, For, Menu, Portal } from "@chakra-ui/react";

import { useModel } from "./useModel";

export const AllValuesIndicatorFilter = () => {
	const { title, options, currentType, handleSelect } = useModel();

	return (
		<Menu.Root onSelect={handleSelect}>
			<Menu.Trigger asChild>
				<Button
					h={5}
					padding={0}
					variant={"plain"}
					fontSize={"sm"}
					gap={2}
					color={"gray.500"}
					textDecoration={"underline dashed"}
					textUnderlineOffset={4}
					_focus={{
						outline: "none",
					}}
					_hover={{ color: "gray.900" }}
				>
					{title}
				</Button>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content>
						<For each={options}>
							{({ name, value }) => (
								<Menu.Item
									key={value}
									value={value}
									disabled={currentType === value}
								>
									{name}
								</Menu.Item>
							)}
						</For>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};
