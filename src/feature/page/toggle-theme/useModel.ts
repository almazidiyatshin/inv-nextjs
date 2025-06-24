import { useTheme } from "next-themes";
import type { TColorMode } from "./types";

export const useModel = () => {
	const { resolvedTheme, forcedTheme, setTheme } = useTheme();
	const colorMode = (forcedTheme || resolvedTheme) as TColorMode;

	const toggleColorMode = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	return { isDarkMode: colorMode === "dark", toggleColorMode };
};
