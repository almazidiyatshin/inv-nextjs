'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from './styles.module.css';
import cn from 'classnames';
import { LS_LOCALE_KEY } from '@/constants/common';
import { useCallback, useEffect, useState } from 'react';

const locales = ['en', 'ru'];

export const LangToggleButton = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [currentLocale, setCurrentLocale] = useState<string | null>(null);

	const handleChangeLocale = useCallback(
		(locale: string) => {
			const segments = pathname.split('/').filter(Boolean);
			if (!segments.length) {
				return;
			}
			if (locales.includes(segments[0])) {
				segments[0] = locale;
			} else {
				segments.unshift(locale);
			}
			router.push(`/${segments.join('/')}`);
		},
		[pathname, router]
	);

	useEffect(() => {
		const locale = localStorage.getItem(LS_LOCALE_KEY);
		if (locale) {
			setCurrentLocale(locale);
		} else {
			setCurrentLocale('en');
		}
	}, []);

	if (currentLocale === null) {
		return null;
	}

	return (
		<div className={styles.btnGroup}>
			{locales.map((locale) => {
				const isActive = locale === currentLocale;

				return (
					<button
						key={locale}
						value={locale}
						className={cn(styles.btn, {
							[styles.btn__active]: isActive,
						})}
						disabled={isActive}
						onClick={() => handleChangeLocale(locale)}
					>
						{locale}
					</button>
				);
			})}
		</div>
	);
};
