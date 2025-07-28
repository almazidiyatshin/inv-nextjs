"use client";

import { createListCollection } from "@chakra-ui/react";
import { EPortfolioType } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useCommonApi } from "shared/api";
import { toaster } from "shared/providers";
import { EAddPortfolioFormField, type TAddPortfolioFormValues } from "./types";

export const useModel = () => {
	const t = useTranslations();
	const [request, { isLoading }] = useCommonApi.postCreatePortfolio();
	const {
		register,
		control,
		handleSubmit: handleSubmitForm,
		reset,
		formState: { errors },
	} = useForm<TAddPortfolioFormValues>({
		shouldUnregister: true,
		defaultValues: {
			[EAddPortfolioFormField.NAME]: undefined,
			[EAddPortfolioFormField.TYPE]: [],
		},
		mode: "onTouched",
	});

	const texts = {
		name: t("name"),
		type: t("type"),
		submit: t("submit"),
		selectType: t("selectType"),
		requiredError: t("requiredError"),
		placeholder: t("portfolioNamePlaceholder"),
	};

	const options = createListCollection({
		items: [
			{ label: EPortfolioType.BROKERAGE, value: EPortfolioType.BROKERAGE },
			{ label: EPortfolioType.MONEY, value: EPortfolioType.MONEY },
		],
	});

	const handleSubmit = handleSubmitForm(async (data) => {
		const body = {
			[EAddPortfolioFormField.NAME]: data[EAddPortfolioFormField.NAME],
			[EAddPortfolioFormField.TYPE]: data[
				EAddPortfolioFormField.TYPE
			][0] as EPortfolioType,
		};

		await request(body)
			.unwrap()
			.then(() => {
				toaster.create({
					title: t("dataSubmitSuccess"),
					type: "success",
				});

				reset(
					{},
					{
						keepErrors: false,
						keepDirty: false,
						keepIsSubmitted: false,
						keepTouched: false,
					},
				);
			})
			.catch(() => {
				toaster.create({
					title: t("dataSubmitFailure"),
					type: "error",
				});
			});
	});

	return { texts, options, register, control, isLoading, errors, handleSubmit };
};
