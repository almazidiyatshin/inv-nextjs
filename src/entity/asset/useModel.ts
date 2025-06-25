import { useTranslation } from "shared/lib";
import { toaster } from "shared/providers";
import { toRub } from "shared/utils";
import type { TAssetProps } from "./types";

export const useModel = ({ value }: Pick<TAssetProps, "value">) => {
	const t = useTranslation();
	const formattedValue = toRub(Number(value.toFixed(0)));

	const handleCopy = () =>
		toaster.create({
			title: t("copied"),
			type: "success",
		});

	return { formattedValue, handleCopy };
};
