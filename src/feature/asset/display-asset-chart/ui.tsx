"use client";

import { Chart } from "@chakra-ui/charts";
import { Skeleton } from "@chakra-ui/react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { TAssetChartProps } from "./types";
import { useModel } from "./useModel";

export const AssetChart = ({
	dataset,
	isNegative,
	isLoading,
}: TAssetChartProps) => {
	const { chart } = useModel({ dataset, isNegative });

	return (
		<Chart.Root maxH="sm" chart={chart}>
			{isLoading ? (
				<Skeleton height={"5"} width={"100%"} />
			) : (
				<AreaChart data={chart.data}>
					<CartesianGrid
						stroke={chart.color("border")}
						vertical={false}
						strokeDasharray="3 3"
					/>
					<XAxis
						dataKey={chart.key("date")}
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<YAxis tickLine={false} axisLine={false} />
					<Tooltip
						cursor={false}
						animationDuration={100}
						content={<Chart.Tooltip />}
					/>

					{chart.series.map((item) => (
						<defs key={item.name}>
							<Chart.Gradient
								id={`${chart.id}-gradient`}
								stops={[
									{ offset: "0%", color: item.color, opacity: 0.3 },
									{ offset: "100%", color: item.color, opacity: 0.05 },
								]}
							/>
						</defs>
					))}

					{chart.series.map((item) => (
						<Area
							key={item.name}
							type="natural"
							isAnimationActive={false}
							dataKey={chart.key(item.name)}
							fill={`url(#${chart.id}-gradient)`}
							stroke={chart.color(item.color)}
							strokeWidth={2}
							stackId="a"
						/>
					))}
				</AreaChart>
			)}
		</Chart.Root>
	);
};
