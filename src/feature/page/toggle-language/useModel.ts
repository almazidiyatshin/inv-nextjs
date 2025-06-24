"use client";

import type { SwitchCheckedChangeDetails } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LS_LOCALE_KEY } from "shared/constants";

const locales = ["en", "ru"];

export const useModel = () => {
	const router = useRouter();
	const pathname = usePathname();

	const [currentLocale, setCurrentLocale] = useState<string | null>(null);

	const handleChangeLocale = (details: SwitchCheckedChangeDetails) => {
		const locale = details.checked ? "en" : "ru";

		setCurrentLocale(locale);
		localStorage.setItem(LS_LOCALE_KEY, locale);

		const segments = pathname?.split("/").filter(Boolean);

		if (!segments?.length) {
			return;
		}
		if (locales.includes(segments[0])) {
			segments[0] = locale;
		} else {
			segments.unshift(locale);
		}

		router.push(`/${segments.join("/")}`);
	};

	useEffect(() => {
		const locale = localStorage.getItem(LS_LOCALE_KEY) || "en";
		setCurrentLocale(locale);
	}, []);

	return {
		currentLocale,
		handleChangeLocale,
	};
};
