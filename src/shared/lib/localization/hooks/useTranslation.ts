"use client";

import { useEffect, useState } from "react";
import { LS_LOCALE_KEY } from "shared/constants";
import en from "../en.json";
import ru from "../ru.json";

export const translations = { en, ru };
export type TLocale = keyof typeof translations;
export type TTranslationKeys = keyof typeof translations.en;

// export const useTranslation = (localeFromProps?: TLocale) => {
// 	const locale =
// 		localeFromProps ||
// 		((localStorage.getItem(LS_LOCALE_KEY) || "en") as TLocale);
// 	const t = locale ? translations[locale] : translations.en;

// 	return (key: TTranslationKeys) => t[key] || key;
// };

export const useTranslation = (localeFromProps?: TLocale) => {
	const [currentLocale, setCurrentLocale] = useState<TLocale>(
		localeFromProps || "en",
	);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedLocale = localStorage.getItem(LS_LOCALE_KEY) as TLocale;
			if (storedLocale && translations[storedLocale]) {
				setCurrentLocale(storedLocale);
			} else {
				setCurrentLocale("en");
			}
		}
	}, []);

	const t = translations[currentLocale] || translations.en;

	return (key: TTranslationKeys) => t[key] || key;
};
