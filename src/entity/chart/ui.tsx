"use client";

import { Chart as ChakraChart } from "@chakra-ui/charts";
import { Cell, Pie, PieChart } from "recharts";
import type { TChartProps } from "./types";
import { useModel } from "./useModel";

export const Chart = ({ dataSet }: TChartProps) => {
	const { chart, buildLabel } = useModel({ dataSet });

	return (
		<ChakraChart.Root boxSize="200px" mx="auto" chart={chart}>
			<PieChart>
				<Pie
					blendStroke
					isAnimationActive={false}
					data={chart.data}
					dataKey={chart.key("value")}
					outerRadius={80}
					innerRadius={0}
					labelLine={false}
					label={buildLabel}
				>
					{chart.data.map(({ name, color }) => (
						<Cell key={name} fill={chart.color(color)} />
					))}
				</Pie>
			</PieChart>
		</ChakraChart.Root>
	);
};
