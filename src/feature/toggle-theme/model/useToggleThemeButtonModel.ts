"use client";

import { useColorMode } from "../lib";

export const useToggleThemeButtonModel = () => {
	const { toggleColorMode } = useColorMode();

	return { toggleColorMode };
};
