import { useTranslation } from "shared/lib";
import { toaster } from "shared/providers";
import { toRub } from "shared/utils";
import type { TAssetProps } from "./types";

export const useModel = ({ value }: Pick<TAssetProps, "value">) => {
	const t = useTranslation();

	const texts = {
		copy: t("copy"),
		copied: t("copied"),
		notCopied: t("notCopied"),
	};

	const formattedValue = toRub(Number(value.toFixed(0)));

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(formattedValue.replace(/\D/g, ""));
			toaster.create({
				title: texts.copied,
				type: "success",
			});
		} catch {
			toaster.create({
				title: texts.notCopied,
				type: "error",
			});
		}
	};

	return { texts, formattedValue, handleCopy };
};
