'use client';

import {
	ChakraProvider as DefaultChakraProvider,
	createSystem,
	defaultConfig,
	defineConfig,
} from '@chakra-ui/react';
import { ThemeProvider, ThemeProviderProps } from 'next-themes';

const customConfig = defineConfig({
	globalCss: {
		body: {
			padding: '16px',
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
