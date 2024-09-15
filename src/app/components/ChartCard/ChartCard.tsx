'use client';

import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Context } from 'chartjs-plugin-datalabels';

import styles from './styles.module.css';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

type TProps = {
	title: string;
	values: number[];
	labels: string[];
	colors: string[];
};

export const ChartCard = ({ title, values, labels, colors }: TProps) => {
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
				padding: 16,
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
		labels,
		datasets: [
			{
				label: 'Part',
				data: values,
				backgroundColor: colors,
				hoverOffset: 4,
				borderWidth: 0,
			},
		],
	};

	return (
		<div className={styles.chartCard}>
			<p className={styles.title}>{title}</p>
			<Doughnut data={data} options={options} />
		</div>
	);
};
