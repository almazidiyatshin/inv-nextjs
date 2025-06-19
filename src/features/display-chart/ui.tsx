"use client";

import { Chart } from "@chakra-ui/charts";
import { Card, Stat } from "@chakra-ui/react";
import { Cell, Pie, PieChart } from "recharts";
import type { TChartCardProps } from "./types";
import { useModel } from "./useModel";

export const ChartCard = ({ title, dataSet }: TChartCardProps) => {
	const { chart } = useModel({ dataSet });

	return (
		<Card.Root minWidth={"xs"} flex={"1"}>
			<Card.Header>
				<Stat.Root>
					<Stat.Label>{title}</Stat.Label>
				</Stat.Root>
			</Card.Header>
			<Card.Body>
				<Chart.Root boxSize="200px" mx="auto" chart={chart}>
					<PieChart>
						<Pie
							blendStroke
							isAnimationActive={false}
							data={chart.data}
							dataKey={chart.key("value")}
							outerRadius={80}
							innerRadius={0}
							labelLine={false}
							label={({ name, index }) => {
								const { value } = chart.data[index ?? -1];
								const percent = value / chart.getTotal("value");
								return `${name}: ${(percent * 100).toFixed(1)}%`;
							}}
						>
							{chart.data.map((item) => (
								<Cell key={item.name} fill={chart.color(item.color)} />
							))}
						</Pie>
					</PieChart>
				</Chart.Root>
			</Card.Body>
		</Card.Root>
	);
};
