import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react";
import * as React from "react";
import type { ITooltipProps } from "./types";

export const Tooltip = React.forwardRef<HTMLDivElement, ITooltipProps>(
	function Tooltip(props, ref) {
		const {
			showArrow,
			children,
			disabled,
			portalled = true,
			content,
			contentProps,
			portalRef,
			...rest
		} = props;

		if (disabled) return children;

		return (
			<ChakraTooltip.Root {...rest} openDelay={300} closeDelay={100}>
				<ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
				<Portal disabled={!portalled} container={portalRef}>
					<ChakraTooltip.Positioner marginTop={"1"}>
						<ChakraTooltip.Content ref={ref} {...contentProps}>
							{showArrow && (
								<ChakraTooltip.Arrow>
									<ChakraTooltip.ArrowTip />
								</ChakraTooltip.Arrow>
							)}
							{content}
						</ChakraTooltip.Content>
					</ChakraTooltip.Positioner>
				</Portal>
			</ChakraTooltip.Root>
		);
	},
);
