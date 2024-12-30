import { LS_LOCALE_KEY } from '@/constants/common';
import {
	TLocale,
	translations,
	TTranslationKeys,
} from '../hooks/useTranslation';

export const getCurrentLocale = (): TLocale => {
	return (localStorage.getItem(LS_LOCALE_KEY) as TLocale) || 'en';
};

export const translate = (key: TTranslationKeys, locale?: TLocale): string => {
	const currentLocale = locale || getCurrentLocale();
	const t = translations[currentLocale] || translations['en'];
	console.log({ currentLocale });
	return t[key] || key;
};
