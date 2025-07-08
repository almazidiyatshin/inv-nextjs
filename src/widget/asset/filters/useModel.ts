import type { CollapsibleOpenChangeDetails } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ECandleInterval, EValueType } from "shared/constants";
import type { RootState } from "shared/lib";
import type { TAssetFiltersProps } from "./types";

export const useModel = ({ id }: Pick<TAssetFiltersProps, "id">) => {
	const t = useTranslations();
	const filters = useSelector((state: RootState) => state.filters[id]);

	const [isOpen, setIsOpen] = useState(false);

	const texts = {
		filters: t("filters"),
	};

	const labels: { [key in string]: string } = {
		interval: t("range"),
		value: t("value"),
	};

	const values: { [key in string]: string } = {
		[ECandleInterval.YEAR]: t("year"),
		[ECandleInterval.FIVE_YEARS]: t("fiveYears"),
		[ECandleInterval.TEN_YEARS]: t("tenYears"),
		[EValueType.ASSET]: t("byAssetValue"),
		[EValueType.PORTFOLIO]: t("byPortfolioValue"),
	};

	const tags = Object.entries(filters).reduce<
		{ label: string; value: string }[]
	>(
		(acc, [key, value]) =>
			acc.concat({
				label: labels[key],
				value: values[value].toLowerCase(),
			}),
		[],
	);

	const handleChange = (details: CollapsibleOpenChangeDetails) =>
		setIsOpen(details.open);

	return { isOpen, texts, tags, handleChange };
};
