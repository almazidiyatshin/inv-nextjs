import { useChart } from "@chakra-ui/charts";
import type { TAssetChartProps } from "./types";

export const useModel = ({
	dataset,
	isNegative,
}: Omit<TAssetChartProps, "isLoading">) => {
	const chart = useChart({
		data: dataset,
		series: [{ name: "value", color: isNegative ? "red.solid" : "teal.solid" }],
	});

	return {
		chart,
	};
};
