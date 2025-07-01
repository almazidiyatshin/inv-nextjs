"use client";

import {
	Button,
	Field,
	Fieldset,
	For,
	Input,
	SimpleGrid,
} from "@chakra-ui/react";
import type { TAddAssetsDataFormProps } from "./types";
import { useModel } from "./useModel";

export const AddAssetsDataForm = ({ portfolioId }: TAddAssetsDataFormProps) => {
	const { texts, fields, isLoading, handleSubmit } = useModel({ portfolioId });

	return (
		<form onSubmit={handleSubmit}>
			<Fieldset.Root size="lg" maxW="md" disabled={isLoading}>
				<Fieldset.Content>
					<SimpleGrid columns={2} gap={"4"} width="full">
						{
							<For each={fields[portfolioId]()}>
								{({ required, label, inputProps }) => (
									<Field.Root required={required}>
										<Field.Label>
											{label} <Field.RequiredIndicator />
										</Field.Label>
										<Input {...inputProps} />
									</Field.Root>
								)}
							</For>
						}
					</SimpleGrid>
				</Fieldset.Content>

				<Button
					loading={isLoading}
					type="submit"
					colorPalette={"teal"}
					alignSelf="flex-end"
				>
					{texts.buttonTitle}
				</Button>
			</Fieldset.Root>
		</form>
	);
};
