"use client";

import {
	createSystem,
	ChakraProvider as DefaultChakraProvider,
	defaultConfig,
	defineConfig,
} from "@chakra-ui/react";
import { ThemeProvider, type ThemeProviderProps } from "next-themes";

const customConfig = defineConfig({
	globalCss: {
		body: {
			padding: "16px",
		},
	},
});

export const system = createSystem(defaultConfig, customConfig);

export const ChakraProvider = (props: ThemeProviderProps) => {
	return (
		<DefaultChakraProvider value={system}>
			<ThemeProvider attribute="class" disableTransitionOnChange {...props} />
		</DefaultChakraProvider>
	);
};
