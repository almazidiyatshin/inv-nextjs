'use client';

import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Context } from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

type Props = {
	costs: number[];
};

export const CommonChart = ({ costs }: Props) => {
	const options = {
		plugins: {
			legend: {
				display: true,
			},
			datalabels: {
				color: 'black',
				borderRadius: 4,
				font: {
					size: 12,
				},
				padding: 20,
				formatter: (value: number, context: Context) => {
					const labels = context.chart.data.labels;
					if (labels && labels.length > 0) {
						const label = labels[context.dataIndex] as string;
						return `${label}\n${value.toFixed() + '%'}`;
					}
					return `${value.toFixed() + '%'}`;
				},
				anchor: 'end' as const,
				align: 'start' as const,
			},
		},
	};

	const data = {
		labels: ['Shares', 'Bonds', 'Gold'],
		datasets: [
			{
				label: 'Cost',
				data: costs,
				backgroundColor: [
					'rgb(250, 128, 114)',
					'rgb(135, 206, 250)',
					'rgb(240, 230, 140)',
				],
				hoverOffset: 4,
				borderWidth: 0,
			},
		],
	};

	return <Doughnut data={data} options={options} />;
};
