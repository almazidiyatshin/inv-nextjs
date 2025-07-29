"use client";

import { Button, Field, Fieldset, Input, Select } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { EAddPortfolioFormField } from "./types";
import { useModel } from "./useModel";

export const AddPortfolioForm = () => {
	const { texts, options, register, control, isLoading, errors, handleSubmit } =
		useModel();

	return (
		<form onSubmit={handleSubmit}>
			<Fieldset.Root size="lg">
				<Fieldset.Content>
					<Field.Root invalid={!!errors[EAddPortfolioFormField.NAME]}>
						<Field.Label color={"gray.500"}>{texts.name}</Field.Label>
						<Input
							size={"sm"}
							placeholder={texts.placeholder}
							_placeholder={{ fontStyle: "italic" }}
							{...register(EAddPortfolioFormField.NAME, {
								required: texts.requiredError,
							})}
						/>
						<Field.ErrorText>
							{errors[EAddPortfolioFormField.NAME]?.message}
						</Field.ErrorText>
					</Field.Root>

					<Field.Root invalid={!!errors[EAddPortfolioFormField.TYPE]}>
						<Field.Label color={"gray.500"}>{texts.type}</Field.Label>
						<Controller
							control={control}
							name={EAddPortfolioFormField.TYPE}
							rules={{
								required: texts.requiredError,
								validate: (value) => !!value.length,
							}}
							render={({ field }) => (
								<Select.Root
									collection={options}
									size="sm"
									name={field.name}
									value={field.value}
									onValueChange={({ value }) => field.onChange(value)}
									onInteractOutside={() => field.onBlur()}
								>
									<Select.HiddenSelect />
									<Select.Control>
										<Select.Trigger>
											<Select.ValueText placeholder={texts.selectType} />
										</Select.Trigger>
										<Select.IndicatorGroup>
											<Select.Indicator />
										</Select.IndicatorGroup>
									</Select.Control>
									<Select.Positioner>
										<Select.Content>
											{options.items.map((item) => (
												<Select.Item item={item} key={item.value}>
													{item.label}
												</Select.Item>
											))}
										</Select.Content>
									</Select.Positioner>
								</Select.Root>
							)}
						/>
						<Field.ErrorText>
							{errors[EAddPortfolioFormField.TYPE]?.message}
						</Field.ErrorText>
					</Field.Root>
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
