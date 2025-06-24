"use client";

import { Icon, Switch } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useModel } from "./useModel";

export const ToggleThemeButton = () => {
	const { isDarkMode, toggleColorMode } = useModel();

	return (
		<Switch.Root
			colorPalette="teal"
			size="lg"
			checked={isDarkMode}
			onCheckedChange={toggleColorMode}
		>
			<Switch.HiddenInput />
			<Switch.Control>
				<Switch.Thumb />
				<Switch.Indicator fallback={<Icon as={LuMoon} color="gray.400" />}>
					<Icon as={LuSun} color="yellow.400" />
				</Switch.Indicator>
			</Switch.Control>
		</Switch.Root>
	);
};
