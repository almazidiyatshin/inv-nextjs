import type { FormatNumberProps } from "@chakra-ui/react";
import { LuAsterisk, LuPercent, LuRussianRuble } from "react-icons/lu";
import { EIndicatorType } from "shared/types";
import type { TIndicatorProps } from "./types";

const config: { [key in EIndicatorType]: Omit<FormatNumberProps, "value"> } = {
	[EIndicatorType.CURRENCY]: {
		style: "currency",
		currency: "RUB",
		currencyDisplay: "narrowSymbol",
	},
	[EIndicatorType.NUMBER]: {
		style: "decimal",
	},
};

const icons = {
	[EIndicatorType.CURRENCY]: LuRussianRuble,
	[EIndicatorType.NUMBER]: LuAsterisk,
};

export const useModel = ({ type }: Pick<TIndicatorProps, "type">) => {
	return {
		valueProps: type ? config[type] : undefined,
		icon: type ? icons[type] : LuPercent,
	};
};
