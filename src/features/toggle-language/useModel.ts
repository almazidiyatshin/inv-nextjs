'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { LS_LOCALE_KEY } from 'shared/constants';
import { useTranslation } from 'shared/lib';

const locales = ['en', 'ru'];

export const useModel = () => {
	const t = useTranslation();
	const router = useRouter();
	const pathname = usePathname();
	const [currentLocale, setCurrentLocale] = useState<string | null>(null);

	const handleChangeLocale = useCallback(
		(locale: string) => {
			setCurrentLocale(locale);
			localStorage.setItem(LS_LOCALE_KEY, locale);

			const segments = pathname?.split('/').filter(Boolean);
			if (!segments?.length) {
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
		const locale = localStorage.getItem(LS_LOCALE_KEY) || 'en';
		setCurrentLocale(locale);
	}, []);

	return { t, currentLocale, locales, handleChangeLocale };
};
