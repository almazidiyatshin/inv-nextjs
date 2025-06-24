"use client";

import {
	ClientOnly,
	IconButton,
	type IconButtonProps,
	Skeleton,
} from "@chakra-ui/react";
import React from "react";
import { useToggleThemeButtonModel } from "../model";
import { ColorModeIcon } from "./ColorModeIcon";

export const ToggleThemeButton = React.forwardRef<
	HTMLButtonElement,
	Omit<IconButtonProps, "aria-label">
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
						width: "5",
						height: "5",
					},
				}}
			>
				<ColorModeIcon />
			</IconButton>
		</ClientOnly>
	);
});
