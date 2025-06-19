import { useChart } from "@chakra-ui/charts";
import type { TChartCardProps } from "./types";

export const useModel = ({ dataSet }: Pick<TChartCardProps, "dataSet">) => {
	const chart = useChart({
		data: dataSet,
	});

	return { chart };
};
