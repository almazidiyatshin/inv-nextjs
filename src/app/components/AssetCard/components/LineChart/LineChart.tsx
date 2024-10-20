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
				borderColor: 'rgb(75, 192, 192)',
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
			},
		],
	};

	const options = {
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
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
