'use client';

import {
	ClientOnly,
	Skeleton,
	IconButton,
	IconButtonProps,
} from '@chakra-ui/react';
import React from 'react';
import { ColorModeIcon } from './ColorModeIcon';
import { useToggleThemeButtonModel } from '../model';

export const ToggleThemeButton = React.forwardRef<
	HTMLButtonElement,
	Omit<IconButtonProps, 'aria-label'>
>(function ToggleThemeButton(props, ref) {
	const { toggleColorMode } = useToggleThemeButtonModel();

	return (
		<ClientOnly fallback={<Skeleton boxSize="8" />}>
			<IconButton
				onClick={toggleColorMode}
				variant="ghost"
				aria-label="Toggle color mode"
				size="sm"
				ref={ref}
				{...props}
				css={{
					_icon: {
						width: '5',
						height: '5',
					},
				}}
			>
				<ColorModeIcon />
			</IconButton>
		</ClientOnly>
	);
});
