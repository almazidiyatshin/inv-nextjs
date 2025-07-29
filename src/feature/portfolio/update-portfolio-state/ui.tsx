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
import { random } from "lodash";
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
										<Field.Label color={"gray.500"}>
											{texts.quantity}
										</Field.Label>
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
											placeholder={random(0, 100).toFixed(0)}
											_placeholder={{ fontStyle: "italic" }}
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
										<Field.Label color={"gray.500"}>{texts.price}</Field.Label>
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
											placeholder={random(0, 100, true).toFixed(2)}
											_placeholder={{ fontStyle: "italic" }}
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
