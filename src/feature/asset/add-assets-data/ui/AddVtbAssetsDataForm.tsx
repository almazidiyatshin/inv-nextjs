"use client";

import { Button, Field, Fieldset, Input } from "@chakra-ui/react";
import { useAssetsDataFormModel } from "../model/useAssetsDataFormModel";

export const AddVtbAssetsDataForm = () => {
	const { register, handleSubmit } = useAssetsDataFormModel();

	return (
		<form onSubmit={handleSubmit}>
			<Fieldset.Root size="lg" maxW="md">
				<Fieldset.Content>
					<Field.Root required>
						<Field.Label>
							EQMX <Field.RequiredIndicator />
						</Field.Label>
						<Input
							{...register("eqmx", { required: true })}
							type="number"
							placeholder="Введите сумму в рублях"
						/>
					</Field.Root>

					<Field.Root required>
						<Field.Label>
							OBLG <Field.RequiredIndicator />
						</Field.Label>
						<Input
							{...register("oblg", { required: true })}
							type="number"
							placeholder="Введите сумму в рублях"
						/>
					</Field.Root>

					<Field.Root required>
						<Field.Label>
							GOLD <Field.RequiredIndicator />
						</Field.Label>
						<Input
							{...register("gold", { required: true })}
							type="number"
							placeholder="Введите сумму в рублях"
						/>
					</Field.Root>
				</Fieldset.Content>

				<Button type="submit" colorPalette={"teal"} alignSelf="flex-end">
					Submit
				</Button>
			</Fieldset.Root>
		</form>
	);
};
