import { IndicatorsWidget } from '@/app/widgets/IndicatorsWidget';

import styles from './styles.module.css';

export const Header = async () => {
	let indicators = [];

	try {
		const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
			? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
			: 'http://localhost:3000';
		const res = await fetch(`${baseUrl}/api/indicators`);
		indicators = await res.json();
	} catch (e) {
		console.error(e);
		indicators = [];
	}

	return (
		<div className={styles.header}>
			<h1 className={styles.title}>Dashboard</h1>
			{indicators.length > 1 && <IndicatorsWidget data={indicators} />}
		</div>
	);
};
