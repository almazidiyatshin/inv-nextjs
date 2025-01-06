import { IndicatorsWidget } from '@/app/widgets/IndicatorsWidget';

import styles from './styles.module.css';
import { LangToggleButton } from '../LangToggleButton';
import { ThemeToggleButton } from '../ThemeToggleButton';
import { TLocale, useTranslation } from '@/app/hooks/useTranslation';

type TProps = {
	locale: TLocale;
};

export const Header = async ({ locale }: TProps) => {
	const t = useTranslation(locale);

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
		<div>
			<div className={styles.menu}>
				<LangToggleButton />
				<ThemeToggleButton />
			</div>
			<div className={styles.header}>
				<h1 className={styles.title}>{t('investmentPortfolio')}</h1>
				{indicators.length > 1 && (
					<IndicatorsWidget data={indicators} locale={locale} />
				)}
			</div>
		</div>
	);
};
