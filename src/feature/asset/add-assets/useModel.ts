"use client";

import { createListCollection } from "@chakra-ui/react";
import { EAssetType } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useCommonApi } from "shared/api";
import { toaster } from "shared/providers";
import { EAddAssetsFormField, type TAddAssetsFormValues } from "./types";

export const useModel = () => {
	const t = useTranslations();
	const { data: portfolios } = useCommonApi.getPortfolios();
	const [request, { isLoading }] = useCommonApi.postCreateAsset();
	const {
		register,
		control,
		handleSubmit: handleSubmitForm,
		reset,
		formState: { errors },
	} = useForm<TAddAssetsFormValues>({
		shouldUnregister: true,
		defaultValues: {
			[EAddAssetsFormField.NAME]: undefined,
			[EAddAssetsFormField.QUANTITY]: undefined,
			[EAddAssetsFormField.PRICE]: undefined,
			[EAddAssetsFormField.TYPE]: [],
			[EAddAssetsFormField.PORTFOLIO]: [],
		},
		mode: "onTouched",
	});

	const texts = {
		name: t("name"),
		quantity: t("quantity"),
		price: t("price"),
		type: t("type"),
		portfolio: t("portfolio"),
		submit: t("submit"),
		selectType: t("selectType"),
		selectPortfolio: t("selectPortfolio"),
		requiredError: t("requiredError"),
		placeholder: t("assetNamePlaceholder"),
	};

	const typeOptions = createListCollection({
		items: [
			{ label: EAssetType.SHARE, value: EAssetType.SHARE },
			{ label: EAssetType.BOND, value: EAssetType.BOND },
			{ label: EAssetType.METAL, value: EAssetType.METAL },
			{ label: EAssetType.MONEY, value: EAssetType.MONEY },
		],
	});

	const portfolioOptions = useMemo(() => {
		const items = (portfolios || []).map(({ id, name }) => ({
			label: name,
			value: id,
		}));

		return createListCollection({
			items,
		});
	}, [portfolios]);

	const handleSubmit = handleSubmitForm(async (data) => {
		const body = {
			[EAddAssetsFormField.NAME]: data[EAddAssetsFormField.NAME],
			[EAddAssetsFormField.TYPE]: data[
				EAddAssetsFormField.TYPE
			][0] as EAssetType,
			[EAddAssetsFormField.PORTFOLIO]: Number(
				data[EAddAssetsFormField.PORTFOLIO][0],
			),
			[EAddAssetsFormField.QUANTITY]: data[EAddAssetsFormField.QUANTITY],
			[EAddAssetsFormField.PRICE]: data[EAddAssetsFormField.PRICE],
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

	return {
		texts,
		typeOptions,
		portfolioOptions,
		register,
		control,
		isLoading,
		errors,
		handleSubmit,
	};
};
