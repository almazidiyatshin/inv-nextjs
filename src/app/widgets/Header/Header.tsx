import styles from './styles.module.css';
import { LangToggleButton } from '../../components/LangToggleButton';
import { ThemeToggleButton } from '../../components/ThemeToggleButton';
import { TLocale, useTranslation } from '@/app/hooks/useTranslation';

type TProps = {
	locale: TLocale;
};

export const Header = async ({ locale }: TProps) => {
	const t = useTranslation(locale);

	return (
		<div>
			<div className={styles.menu}>
				<LangToggleButton />
				<ThemeToggleButton />
			</div>
			<h1>{t('investmentPortfolio')}</h1>
		</div>
	);
};
