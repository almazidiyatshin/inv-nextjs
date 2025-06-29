"use client";

import { Button, Field, Fieldset, Input } from "@chakra-ui/react";
import { useAssetsDataFormModel } from "../model/useAssetsDataFormModel";

export const AddSberAssetsDataForm = () => {
	const { register, handleSubmit } = useAssetsDataFormModel();

	return (
		<form onSubmit={handleSubmit}>
			<Fieldset.Root size="lg" maxW="md">
				<Fieldset.Content>
					<Field.Root required>
						<Field.Label>
							SBMX <Field.RequiredIndicator />
						</Field.Label>
						<Input
							{...register("sbmx", { required: true })}
							type="number"
							placeholder="Введите сумму в рублях"
						/>
					</Field.Root>

					<Field.Root required>
						<Field.Label>
							SBCB <Field.RequiredIndicator />
						</Field.Label>
						<Input
							{...register("sbcb", { required: true })}
							type="number"
							placeholder="Введите сумму в рублях"
						/>
					</Field.Root>

					<Field.Root required>
						<Field.Label>
							SBGB <Field.RequiredIndicator />
						</Field.Label>
						<Input
							{...register("sbgb", { required: true })}
							type="number"
							placeholder="Введите сумму в рублях"
						/>
					</Field.Root>

					<Field.Root required>
						<Field.Label>
							SBRB <Field.RequiredIndicator />
						</Field.Label>
						<Input
							{...register("sbrb", { required: true })}
							type="number"
							placeholder="Введите сумму в рублях"
						/>
					</Field.Root>

					<Field.Root required>
						<Field.Label>
							SBGD <Field.RequiredIndicator />
						</Field.Label>
						<Input
							{...register("sbgd", { required: true })}
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
