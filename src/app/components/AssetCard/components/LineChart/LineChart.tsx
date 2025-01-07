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
	lineChartPrimaryColorSchemaDark,
	lineChartSecondaryColorSchema,
	lineChartSecondaryColorSchemaDark,
} from '@/constants/colors';
import { useTheme } from '@/config/providers';

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
	labels: string[];
	dataset: number[];
};

export const LineChart = ({ labels, dataset }: TProps) => {
	const { theme } = useTheme();
	const isDarkTheme = theme === 'dark';
	const primaryColorSchema = isDarkTheme
		? lineChartPrimaryColorSchemaDark
		: lineChartPrimaryColorSchema;
	const secondaryColorSchema = isDarkTheme
		? lineChartSecondaryColorSchemaDark
		: lineChartSecondaryColorSchema;

	const chartData = {
		labels,
		datasets: [
			{
				data: dataset,
				fill: true,
				...primaryColorSchema,
			},
		],
	};

	const options = {
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					color: secondaryColorSchema.gridColor,
				},
				ticks: {
					color: secondaryColorSchema.ticksColor,
				},
			},
			x: {
				ticks: {
					color: secondaryColorSchema.xTicksColor,
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
