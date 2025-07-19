import { Button, For, Menu, Portal } from "@chakra-ui/react";
import { LuArrowDown } from "react-icons/lu";

import { useModel } from "./useModel";

export const AllValuesIndicatorFilter = () => {
	const { title, options, currentType, handleSelect } = useModel();

	return (
		<Menu.Root onSelect={handleSelect}>
			<Menu.Trigger asChild>
				<Button
					padding={0}
					variant={"plain"}
					fontSize={"lg"}
					gap={2}
					color={"gray.500"}
					_focus={{
						outline: "none",
					}}
					_hover={{ color: "gray.900" }}
				>
					{title}
					<LuArrowDown />
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
