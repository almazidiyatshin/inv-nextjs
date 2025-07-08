"use client";

import {
	Button,
	Field,
	Fieldset,
	For,
	Heading,
	Input,
	SimpleGrid,
	VStack,
} from "@chakra-ui/react";
import {
	EUpdatePortfolioStateFormField,
	type TUpdatePortfolioStateFormProps,
} from "./types";
import { useModel } from "./useModel";

export const UpdatePortfolioStateForm = ({
	assets,
}: TUpdatePortfolioStateFormProps) => {
	const { texts, register, isLoading, errors, handleSubmit } = useModel({
		assets,
	});

	return (
		<form onSubmit={handleSubmit}>
			<Fieldset.Root size="lg">
				<Fieldset.Content>
					<SimpleGrid columns={3} gap={"8"} width="full">
						<For each={assets}>
							{({ name }) => (
								<VStack key={name} align={"flex-start"}>
									<Heading size={"md"}>{name}</Heading>
									<Field.Root
										invalid={
											!!errors[name]?.[EUpdatePortfolioStateFormField.QUANTITY]
										}
									>
										<Field.Label>{texts.quantity}</Field.Label>
										<Input
											size={"sm"}
											{...register(
												`${name}.${EUpdatePortfolioStateFormField.QUANTITY}`,
												{
													required: texts.requiredError,
													valueAsNumber: true,
												},
											)}
											type="number"
										/>
										<Field.ErrorText>
											{
												errors[name]?.[EUpdatePortfolioStateFormField.QUANTITY]
													?.message
											}
										</Field.ErrorText>
									</Field.Root>

									<Field.Root
										invalid={
											!!errors[name]?.[EUpdatePortfolioStateFormField.PRICE]
										}
									>
										<Field.Label>{texts.price}</Field.Label>
										<Input
											size={"sm"}
											{...register(
												`${name}.${EUpdatePortfolioStateFormField.PRICE}`,
												{
													required: texts.requiredError,
													valueAsNumber: true,
												},
											)}
											step="0.0001"
											type="number"
										/>
										<Field.ErrorText>
											{
												errors[name]?.[EUpdatePortfolioStateFormField.PRICE]
													?.message
											}
										</Field.ErrorText>
									</Field.Root>
								</VStack>
							)}
						</For>
					</SimpleGrid>
				</Fieldset.Content>

				<Button
					variant={"solid"}
					type="submit"
					alignSelf="flex-end"
					loading={isLoading}
				>
					{texts.submit}
				</Button>
			</Fieldset.Root>
		</form>
	);
};
