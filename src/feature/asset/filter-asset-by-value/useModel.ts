import type { SegmentGroupValueChangeDetails } from "@chakra-ui/react";
import { EValueType } from "shared/constants";
import { useTranslation } from "shared/lib";
import type { TAssetValueFilterProps } from "./types";

export const useModel = ({ id: _id }: Pick<TAssetValueFilterProps, "id">) => {
	const t = useTranslation();

	const items = [
		{ label: t("byAssetValue"), value: EValueType.ASSET },
		{ label: t("byPortfolioValue"), value: EValueType.PORTFOLIO },
	];

	const texts = {
		label: t("byValue"),
	};

	const handleChange = (_details: SegmentGroupValueChangeDetails) => {};

	return {
		texts,
		items,
		handleChange,
	};
};
