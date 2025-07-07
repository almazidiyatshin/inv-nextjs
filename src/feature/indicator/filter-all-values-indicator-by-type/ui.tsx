import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { LuSettings2 } from "react-icons/lu";

export const AllValuesIndicatorFilter = () => {
	return (
		<Menu.Root>
			<Menu.Trigger margin={"-2"} asChild>
				<IconButton size={"sm"} variant={"ghost"}>
					<LuSettings2 />
				</IconButton>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.Item value="new-txt">All assets value</Menu.Item>
						<Menu.Item value="new-file">All vtb assets value</Menu.Item>
						<Menu.Item value="new-win">All sber assets value</Menu.Item>
						<Menu.Item value="new-win">All t assets value</Menu.Item>
						<Menu.Item value="open-file">All cash assets value</Menu.Item>
						<Menu.Item value="export">All stock assets value</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};
