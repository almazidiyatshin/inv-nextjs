"use client";

import { Button, Field, Fieldset, Input } from "@chakra-ui/react";
import { useAssetsDataFormModel } from "../model/useAssetsDataFormModel";

export const AddCashAssetsDataForm = () => {
	const { register, handleSubmit } = useAssetsDataFormModel();

	return (
		<form onSubmit={handleSubmit}>
			<Fieldset.Root size="lg" maxW="md">
				<Fieldset.Content>
					<Field.Root>
						<Field.Label>USD</Field.Label>
						<Input
							{...register("usd", { required: true })}
							type="number"
							placeholder="Введите сумму в долларах"
						/>
					</Field.Root>

					<Field.Root>
						<Field.Label>RUB</Field.Label>
						<Input
							{...register("rub", { required: true })}
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
