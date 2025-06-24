import type { EIndicatorType } from "shared/types";

export type TIndicatorProps = {
	title: string;
	value?: number | string;
	isLoading: boolean;
	type?: EIndicatorType;
};
