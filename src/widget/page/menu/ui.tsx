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
import { SessionProvider } from "next-auth/react";
import { LuAlignJustify } from "react-icons/lu";
import { NavBar } from "shared/ui";
import { UserWidget } from "widget";
import { useModel } from "./useModel";

export const Menu = () => {
	const { texts, open, onOpen, onClose } = useModel();

	return (
		<SessionProvider>
			<Drawer.Root open={open} onInteractOutside={onClose}>
				<Drawer.Trigger asChild>
					<IconButton colorPalette={"teal"} variant={"ghost"} onClick={onOpen}>
						<LuAlignJustify />
					</IconButton>
				</Drawer.Trigger>

				<Portal>
					<Drawer.Backdrop />
					<Drawer.Positioner>
						<Drawer.Content>
							<Drawer.Header>
								<Drawer.CloseTrigger asChild>
									<CloseButton size={"lg"} onClick={onClose} />
								</Drawer.CloseTrigger>
								<Drawer.Title>{texts.title}</Drawer.Title>
							</Drawer.Header>

							<Drawer.Body fontSize={"md"} onClick={onClose}>
								<VStack gap={"4"} align={"flex-start"}>
									<NavBar />
								</VStack>
							</Drawer.Body>
							<Drawer.Footer justifyContent={"start"}>
								<VStack width={"100%"}>
									<Separator
										color={"gray.400"}
										variant={"solid"}
										width={"100%"}
									/>
									<HStack
										justify={"space-between"}
										padding={"4"}
										width={"100%"}
									>
										<Text fontSize={"md"}>{texts.language}</Text>
										<LanguageToggleButton />
									</HStack>
									<Separator
										color={"gray.400"}
										variant={"solid"}
										width={"100%"}
									/>
									<HStack
										justify={"space-between"}
										padding={"4"}
										width={"100%"}
									>
										<Text fontSize={"md"}>{texts.darkMode}</Text>
										<ToggleThemeButton />
									</HStack>
									<UserWidget />
								</VStack>
							</Drawer.Footer>
						</Drawer.Content>
					</Drawer.Positioner>
				</Portal>
			</Drawer.Root>
		</SessionProvider>
	);
};
