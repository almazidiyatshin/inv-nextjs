"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useCommonApi } from "shared/api";
import { toaster } from "shared/providers";
import {
	EUpdatePortfolioStateFormField,
	type TUpdatePortfolioStateFormProps,
	type TUpdatePortfolioStateFormValues,
} from "./types";

export const useModel = ({ assets }: TUpdatePortfolioStateFormProps) => {
	const t = useTranslations();
	const [request, { isLoading }] = useCommonApi.putUpdateAssetsState();

	const defaultValues = useMemo(
		() =>
			assets.reduce<TUpdatePortfolioStateFormValues>((acc, { name }) => {
				acc[name] = {
					[EUpdatePortfolioStateFormField.QUANTITY]: undefined,
					[EUpdatePortfolioStateFormField.PRICE]: undefined,
				};
				return acc;
			}, {}),
		[assets],
	);

	const {
		register,
		handleSubmit: handleSubmitForm,
		reset,
		formState: { errors },
	} = useForm<TUpdatePortfolioStateFormValues>({
		shouldUnregister: true,
		defaultValues,
		mode: "onTouched",
	});

	const texts = {
		quantity: t("totalQuantity"),
		price: t("currentPrice"),
		submit: t("submit"),
		requiredError: t("requiredError"),
	};

	const handleSubmit = handleSubmitForm(async (data) => {
		const body = Object.entries(data).reduce<
			{
				name: string;
				quantity: number;
				price: number;
				portfolio: number;
			}[]
		>((acc, [assetName, { quantity, price }]) => {
			if (!quantity || !price) return acc;

			acc.push({
				name: assetName,
				quantity,
				price,
				portfolio: assets[0].portfolioId,
			});

			return acc;
		}, []);

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

	return { texts, register, isLoading, errors, handleSubmit };
};
