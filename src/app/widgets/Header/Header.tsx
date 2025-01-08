'use client';

import styles from './styles.module.css';
import { LangToggleButton } from '../../components/LangToggleButton';
import { ThemeToggleButton } from '../../components/ThemeToggleButton';
import { TLocale, useTranslation } from '@/app/hooks/useTranslation';
import { LoginButton } from '@/app/components/LoginButton';
import { SessionProvider } from 'next-auth/react';

type TProps = {
	locale: TLocale;
};

export const Header = ({ locale }: TProps) => {
	const t = useTranslation(locale);

	return (
		<SessionProvider>
			<div>
				<div className={styles.menu}>
					<LoginButton />
					<LangToggleButton />
					<ThemeToggleButton />
				</div>
				<h1 className={styles.title}>{t('investmentPortfolio')}</h1>
			</div>
		</SessionProvider>
	);
};
