"use client";

import { EAssetName, ECurrency, type EPortfolioName } from "@prisma/client";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
	type TCreatePortfolioSnapshotRequestBody,
	useCommonApi,
} from "shared/api";
import { useTranslation } from "shared/lib";
import { toaster } from "shared/providers";
import { assetTypes, portfolioFields, portfolioTypes } from "./lib";
import type { TAddAssetsDataFormProps, TFieldProps, TFields } from "./types";

export const useModel = ({ portfolioId }: TAddAssetsDataFormProps) => {
	const t = useTranslation();
	const [request, { isLoading }] = useCommonApi.postCreatePortfolioSnapshot();
	const {
		register,
		handleSubmit: handleSubmitForm,
		reset,
	} = useForm<TFields>({
		shouldUnregister: true,
	});

	const texts = { buttonTitle: t("submit") };

	const getFieldProps = useCallback(
		({ required, label, fieldName }: TFieldProps) => ({
			required,
			label,
			inputProps: {
				...register(fieldName, {
					required: true,
					valueAsNumber: true,
				}),
				step: "0.0001",
				type: "number",
			},
		}),
		[register],
	);

	const fields = useMemo(() => {
		const generatedFields: Record<
			EPortfolioName,
			() => Array<ReturnType<typeof getFieldProps>>
		> = (Object.keys(portfolioFields) as EPortfolioName[]).reduce(
			(acc, portfolioName) => {
				const assets = portfolioFields[portfolioName];

				acc[portfolioName] = () =>
					assets.flatMap((asset) => [
						getFieldProps({
							required: true,
							label: `${asset}, ${t("quantity")}`,
							fieldName: `${asset}.quantity`,
						}),
						getFieldProps({
							required: true,
							label: `${asset}, ${t("price")}`,
							fieldName: `${asset}.price`,
						}),
					]);
				return acc;
			},
			{} as Record<
				EPortfolioName,
				() => Array<ReturnType<typeof getFieldProps>>
			>,
		);

		return generatedFields;
	}, [getFieldProps, t]);

	const handleSubmit = handleSubmitForm(async (data) => {
		const assets: TCreatePortfolioSnapshotRequestBody["assets"] =
			Object.entries(data).map(([key, { quantity, price }]) => ({
				name: EAssetName[key as EAssetName],
				type: assetTypes[key as EAssetName],
				currency: ECurrency.RUB,
				quantity: quantity,
				price: price,
			}));

		const body: TCreatePortfolioSnapshotRequestBody = {
			name: portfolioId,
			type: portfolioTypes[portfolioId],
			assets,
		};

		try {
			await request({ body }).unwrap();

			toaster.create({
				title: t("dataSubmitSuccess"),
				type: "success",
			});

			reset();
		} catch {
			toaster.create({
				title: t("dataSubmitFailure"),
				type: "error",
			});
		}
	});

	return { texts, fields, isLoading, handleSubmit };
};
