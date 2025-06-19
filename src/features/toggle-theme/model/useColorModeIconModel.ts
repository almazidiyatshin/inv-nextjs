'use client';

import { useColorMode } from '../lib';

export const useColorModeIconModel = () => {
	const { colorMode } = useColorMode();

	return { colorMode };
};
