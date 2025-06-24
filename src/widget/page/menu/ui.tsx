"use client";

import {
	CloseButton,
	Drawer,
	HStack,
	IconButton,
	Portal,
	Separator,
	Text,
	VStack,
} from "@chakra-ui/react";
import { LanguageToggleButton, ToggleThemeButton } from "feature";
import { LuAlignJustify } from "react-icons/lu";
import { UserWidget } from "widget";
import { useModel } from "./useModel";

export const Menu = () => {
	const { title } = useModel();

	return (
		<Drawer.Root>
			<Drawer.Trigger asChild>
				<IconButton colorPalette={"teal"} variant={"ghost"}>
					<LuAlignJustify />
				</IconButton>
			</Drawer.Trigger>

			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.CloseTrigger asChild pos={"initial"}>
								<CloseButton size={"lg"} />
							</Drawer.CloseTrigger>
							<Drawer.Title>{title}</Drawer.Title>
						</Drawer.Header>
						<Drawer.Body />
						<Drawer.Footer justifyContent={"start"}>
							<VStack width={"100%"}>
								<Separator
									color={"gray.400"}
									variant={"solid"}
									width={"100%"}
								/>
								<HStack justify={"space-between"} padding={"4"} width={"100%"}>
									<Text fontSize={"md"}>Language</Text>
									<LanguageToggleButton />
								</HStack>
								<Separator
									color={"gray.400"}
									variant={"solid"}
									width={"100%"}
								/>
								<HStack justify={"space-between"} padding={"4"} width={"100%"}>
									<Text fontSize={"md"}>Dark mode</Text>
									<ToggleThemeButton />
								</HStack>
								<UserWidget />
							</VStack>
						</Drawer.Footer>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
};
