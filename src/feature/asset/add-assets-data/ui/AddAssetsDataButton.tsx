"use client";

import { Button, CloseButton, Dialog, Portal, Tabs } from "@chakra-ui/react";
import { AddCashAssetsDataForm } from "./AddCashAssetsDataForm";
import { AddSberAssetsDataForm } from "./AddSberAssetsDataForm";
import { AddVtbAssetsDataForm } from "./AddVtbAssetsDataForm";

export const AddAssetsDataButton = () => {
	return (
		<Dialog.Root placement={"center"}>
			<Dialog.Trigger asChild>
				<Button colorPalette={"teal"} variant="solid" size="sm">
					Add data
				</Button>
			</Dialog.Trigger>

			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Add assets data</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<Tabs.Root variant={"subtle"} fitted defaultValue="vtb">
								<Tabs.List>
									<Tabs.Trigger value="vtb">Vtb</Tabs.Trigger>
									<Tabs.Trigger value="sber">Sber</Tabs.Trigger>
									<Tabs.Trigger value="cash">Cash</Tabs.Trigger>
								</Tabs.List>
								<Tabs.Content value="vtb">
									<AddVtbAssetsDataForm />
								</Tabs.Content>
								<Tabs.Content value="sber">
									<AddSberAssetsDataForm />
								</Tabs.Content>
								<Tabs.Content value="cash">
									<AddCashAssetsDataForm />
								</Tabs.Content>
							</Tabs.Root>
						</Dialog.Body>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};
