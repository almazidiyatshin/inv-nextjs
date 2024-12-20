import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
	CategoryScale,
} from 'chart.js';
import styles from './styles.module.css';
import {
	lineChartPrimaryColorSchema,
	lineChartSecondaryColorSchema,
} from '@/constants/colors';

ChartJS.register(
	LinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
	CategoryScale
);

type TProps = {
	data: {
		[key: string]: number;
	};
};

export const LineChart = ({ data }: TProps) => {
	const chartData = {
		labels: Object.keys(data),
		datasets: [
			{
				data: Object.values(data),
				fill: true,
				...lineChartPrimaryColorSchema,
			},
		],
	};

	const options = {
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					color: lineChartSecondaryColorSchema.gridColor,
				},
				ticks: {
					color: lineChartSecondaryColorSchema.ticksColor,
				},
			},
			x: {
				ticks: {
					color: lineChartSecondaryColorSchema.xTicksColor,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	return <Line options={options} data={chartData} className={styles.chart} />;
};
