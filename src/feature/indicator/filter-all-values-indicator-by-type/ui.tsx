import { For, IconButton, Menu, Portal } from "@chakra-ui/react";
import { LuSettings2 } from "react-icons/lu";
import { useModel } from "./useModel";

export const AllValuesIndicatorFilter = () => {
	const { options, currentType, handleSelect } = useModel();

	return (
		<Menu.Root onSelect={handleSelect}>
			<Menu.Trigger position={"absolute"} right={"2%"} top={"6%"} asChild>
				<IconButton
					size={"sm"}
					variant={"ghost"}
					_focus={{
						outline: "none",
					}}
				>
					<LuSettings2 />
				</IconButton>
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
