import {
	Button,
	CloseButton,
	Dialog,
	For,
	Portal,
	Tabs,
} from "@chakra-ui/react";
import { AddAssetsDataForm } from "feature";
import { useModel } from "./useModel";

export const AssetsAddingFlow = () => {
	const { texts, config } = useModel();

	return (
		<Dialog.Root placement={"center"}>
			<Dialog.Trigger asChild>
				<Button colorPalette={"teal"} variant="solid" size="sm">
					{texts.buttonTitle}
				</Button>
			</Dialog.Trigger>

			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>{texts.title}</Dialog.Title>
						</Dialog.Header>

						<Dialog.Body>
							<Tabs.Root
								fitted
								lazyMount={true}
								unmountOnExit={true}
								variant={"outline"}
								defaultValue={config.VTB.value}
							>
								<Tabs.List>
									<For each={Object.entries(config)}>
										{([key, { name, value }]) => (
											<Tabs.Trigger key={key} value={value}>
												{name}
											</Tabs.Trigger>
										)}
									</For>
								</Tabs.List>

								{
									<For each={Object.entries(config)}>
										{([key, { value }]) => (
											<Tabs.Content
												paddingY={"6"}
												paddingX={"2"}
												key={key}
												value={value}
											>
												<AddAssetsDataForm portfolioId={value} />
											</Tabs.Content>
										)}
									</For>
								}
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
