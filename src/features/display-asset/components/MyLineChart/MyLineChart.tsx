import { Chart, useChart } from "@chakra-ui/charts";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

type TProps = {
	id: string;
	dataset: { value: number; date: string }[];
	isNegative: boolean;
};

export const MyLineChart = ({ id, dataset, isNegative }: TProps) => {
	const chart = useChart({
		data: dataset,
		series: [{ name: "value", color: isNegative ? "red.solid" : "teal.solid" }],
	});

	return (
		<Chart.Root maxH="sm" chart={chart}>
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
							id={`${id}-gradient`}
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
						fill={`url(#${id}-gradient)`}
						stroke={chart.color(item.color)}
						strokeWidth={2}
						stackId="a"
					/>
				))}
			</AreaChart>
		</Chart.Root>
	);
};
