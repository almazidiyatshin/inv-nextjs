"use client";

import {
	ButtonGroup,
	CloseButton,
	Drawer,
	IconButton,
	Portal,
} from "@chakra-ui/react";
import { LanguageToggleButton, Login, ToggleThemeButton } from "feature/index";
import { LuAlignJustify } from "react-icons/lu";
import { useModel } from "./useModel";

export const MenuWidget = () => {
	const { t } = useModel();

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
							<Drawer.Title>{t("investly")}</Drawer.Title>
							<ButtonGroup>
								<ToggleThemeButton />
								<LanguageToggleButton />
							</ButtonGroup>
						</Drawer.Header>
						<Drawer.Body />
						<Drawer.Footer justifyContent={"start"}>
							<Login />
						</Drawer.Footer>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
};
