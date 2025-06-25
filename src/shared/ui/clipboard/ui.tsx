import { Clipboard as ChakraClipboard, IconButton } from "@chakra-ui/react";
import { Tooltip } from "../tooltip";
import type { TClipboardProps } from "./types";
import { useModel } from "./useModel";

export const Clipboard = ({ value, onCopy }: TClipboardProps) => {
	const { texts } = useModel();

	return (
		<ChakraClipboard.Root
			value={value.replace(/\D/g, "")}
			onStatusChange={onCopy}
		>
			<ChakraClipboard.Trigger asChild>
				<IconButton variant="ghost" size="xs">
					<Tooltip content={texts.copy} openDelay={300} closeDelay={100}>
						<ChakraClipboard.Indicator />
					</Tooltip>
				</IconButton>
			</ChakraClipboard.Trigger>
		</ChakraClipboard.Root>
	);
};
