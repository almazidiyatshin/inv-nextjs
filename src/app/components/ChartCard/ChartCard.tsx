'use client';

import { ArcElement, Chart as ChartJS, Tooltip, Legend } from 'chart.js';

import styles from './styles.module.css';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type TProps = {
	title: string;
	values: number[];
	labels: string[];
	colorSchema: string[];
};

export const ChartCard = ({ title, values, labels, colorSchema }: TProps) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
			},
		},
	};

	const data = {
		labels,
		datasets: [
			{
				label: 'Share',
				data: values,
				backgroundColor: colorSchema,
				hoverOffset: 4,
				borderWidth: 0,
			},
		],
	};

	return (
		<div className={styles.chartCard}>
			<p className={styles.title}>{title}</p>
			<Doughnut data={data} options={options} className={styles.chart} />
		</div>
	);
};
