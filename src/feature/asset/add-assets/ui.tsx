"use client";

import {
	Button,
	Field,
	Fieldset,
	GridItem,
	Input,
	Select,
	SimpleGrid,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { EAddAssetsFormField } from "./types";
import { useModel } from "./useModel";

export const AddAssetsForm = () => {
	const {
		texts,
		typeOptions,
		portfolioOptions,
		register,
		control,
		isLoading,
		errors,
		handleSubmit,
	} = useModel();

	return (
		<form onSubmit={handleSubmit}>
			<Fieldset.Root size="lg">
				<Fieldset.Content>
					<SimpleGrid columns={4} gap={"4"} width="full">
						<GridItem colSpan={2}>
							<Field.Root invalid={!!errors[EAddAssetsFormField.NAME]}>
								<Field.Label>{texts.name}</Field.Label>
								<Input
									size={"sm"}
									{...register(EAddAssetsFormField.NAME, {
										required: texts.requiredError,
									})}
								/>
								<Field.ErrorText>
									{errors[EAddAssetsFormField.NAME]?.message}
								</Field.ErrorText>
							</Field.Root>
						</GridItem>

						<Field.Root invalid={!!errors[EAddAssetsFormField.QUANTITY]}>
							<Field.Label>{texts.quantity}</Field.Label>
							<Input
								size={"sm"}
								{...register(EAddAssetsFormField.QUANTITY, {
									required: texts.requiredError,
									valueAsNumber: true,
								})}
								type="number"
							/>
							<Field.ErrorText>
								{errors[EAddAssetsFormField.QUANTITY]?.message}
							</Field.ErrorText>
						</Field.Root>

						<Field.Root invalid={!!errors[EAddAssetsFormField.PRICE]}>
							<Field.Label>{texts.price}</Field.Label>
							<Input
								size={"sm"}
								{...register(EAddAssetsFormField.PRICE, {
									required: texts.requiredError,
									valueAsNumber: true,
								})}
								step="0.0001"
								type="number"
							/>
							<Field.ErrorText>
								{errors[EAddAssetsFormField.PRICE]?.message}
							</Field.ErrorText>
						</Field.Root>
					</SimpleGrid>

					<SimpleGrid columns={2} gap={"4"} width="full">
						<Field.Root invalid={!!errors[EAddAssetsFormField.TYPE]}>
							<Field.Label>{texts.type}</Field.Label>
							<Controller
								control={control}
								name={EAddAssetsFormField.TYPE}
								rules={{
									required: texts.requiredError,
									validate: (value) => !!value.length,
								}}
								render={({ field }) => (
									<Select.Root
										collection={typeOptions}
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
												{typeOptions.items.map((item) => (
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
								{errors[EAddAssetsFormField.TYPE]?.message}
							</Field.ErrorText>
						</Field.Root>

						<Field.Root invalid={!!errors[EAddAssetsFormField.PORTFOLIO]}>
							<Field.Label>{texts.portfolio}</Field.Label>
							<Controller
								control={control}
								name={EAddAssetsFormField.PORTFOLIO}
								rules={{
									required: texts.requiredError,
									validate: (value) => !!value.length,
								}}
								render={({ field }) => (
									<Select.Root
										collection={portfolioOptions}
										size="sm"
										name={field.name}
										value={field.value}
										onValueChange={({ value }) => field.onChange(value)}
										onInteractOutside={() => field.onBlur()}
									>
										<Select.HiddenSelect />
										<Select.Control>
											<Select.Trigger>
												<Select.ValueText placeholder={texts.selectPortfolio} />
											</Select.Trigger>
											<Select.IndicatorGroup>
												<Select.Indicator />
											</Select.IndicatorGroup>
										</Select.Control>
										<Select.Positioner>
											<Select.Content>
												{portfolioOptions.items.map((item) => (
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
								{errors[EAddAssetsFormField.PORTFOLIO]?.message}
							</Field.ErrorText>
						</Field.Root>
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
