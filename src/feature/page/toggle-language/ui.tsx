"use client";

import { Icon, Switch, Text } from "@chakra-ui/react";
import { useModel } from "./useModel";

export const LanguageToggleButton = () => {
	const { currentLocale, handleChange } = useModel();

	return (
		<Switch.Root
			colorPalette={"teal"}
			size="lg"
			checked={currentLocale === "en"}
			onCheckedChange={handleChange}
		>
			<Switch.HiddenInput />
			<Switch.Control background={"gray.muted"}>
				<Switch.Thumb />
				<Switch.Indicator
					fallback={
						<Icon
							as={() => (
								<Text color={"gray.400"} fontSize={"xs"}>
									en
								</Text>
							)}
							color="gray.400"
						/>
					}
				>
					<Icon
						as={() => (
							<Text color={"gray.400"} fontSize={"xs"}>
								ru
							</Text>
						)}
						color="gray.400"
					/>
				</Switch.Indicator>
			</Switch.Control>
		</Switch.Root>
	);
};
