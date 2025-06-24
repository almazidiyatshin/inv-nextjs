import { useChart } from "@chakra-ui/charts";
import type { TChartProps } from "./types";

export const useModel = ({ dataSet }: Pick<TChartProps, "dataSet">) => {
	const chart = useChart({
		data: dataSet,
	});

	const buildLabel = ({ name, index }: { name: string; index: number }) => {
		const { value } = chart.data[index ?? -1];
		const percent = value / chart.getTotal("value");
		return `${name}: ${(percent * 100).toFixed(1)}%`;
	};

	return { chart, buildLabel };
};
