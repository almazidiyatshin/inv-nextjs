"use client";

import {
	Link as ChakraLink,
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
import NextLink from "next/link";
import { SessionProvider } from "next-auth/react";
import { LuAlignJustify } from "react-icons/lu";
import { UserWidget } from "widget";
import { useModel } from "./useModel";

export const Menu = () => {
	const { texts, currentPath, open, onOpen, onClose } = useModel();

	return (
		<SessionProvider>
			<Drawer.Root open={open}>
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
							<Drawer.Body fontSize={"md"}>
								<VStack gap={"4"} align={"flex-start"}>
									<ChakraLink
										asChild
										fontWeight={currentPath === "dashboard" ? "bold" : "normal"}
										_focus={{
											outline: "none",
										}}
										onClick={onClose}
									>
										<NextLink href="/dashboard">{texts.dashboard}</NextLink>
									</ChakraLink>
									<ChakraLink
										asChild
										fontWeight={
											currentPath === "portfolio-management" ? "bold" : "normal"
										}
										_focus={{
											outline: "none",
										}}
										onClick={onClose}
									>
										<NextLink href="/portfolio-management">
											{texts.portfolioManagement}
										</NextLink>
									</ChakraLink>
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
