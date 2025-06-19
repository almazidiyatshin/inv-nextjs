import { useTheme } from 'next-themes';
import { TColorMode } from './types';

export const useColorMode = () => {
	const { resolvedTheme, forcedTheme, setTheme } = useTheme();

	const toggleColorMode = () => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
	};

	return {
		colorMode: (forcedTheme || resolvedTheme) as TColorMode,
		toggleColorMode,
	};
};
