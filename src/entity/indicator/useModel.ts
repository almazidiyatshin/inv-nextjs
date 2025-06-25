import { LuAsterisk, LuPercent, LuRussianRuble } from "react-icons/lu";
import { EIndicatorType } from "shared/types";
import type { TIndicatorProps } from "./types";

const icons = {
	[EIndicatorType.CURRENCY]: LuRussianRuble,
	[EIndicatorType.NUMBER]: LuAsterisk,
};

export const useModel = ({ type }: Pick<TIndicatorProps, "type">) => {
	return {
		icon: type ? icons[type] : LuPercent,
	};
};
