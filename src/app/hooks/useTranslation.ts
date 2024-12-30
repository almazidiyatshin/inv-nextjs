import { LS_LOCALE_KEY } from '@/constants/common';
import en from '../../locales/en.json';
import ru from '../../locales/ru.json';

export const translations = { en, ru };
export type TLocale = keyof typeof translations;
export type TTranslationKeys = keyof typeof translations.en;

export const useTranslation = (localeFromProps?: TLocale) => {
	const locale =
		localeFromProps ||
		((localStorage.getItem(LS_LOCALE_KEY) || 'en') as TLocale);
	const t = locale ? translations[locale] : translations['en'];

	return (key: TTranslationKeys) => t[key] || key;
};
