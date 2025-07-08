"use client";

import type { SwitchCheckedChangeDetails } from "@chakra-ui/react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "shared/lib/i18n/navigation";

export const useModel = () => {
	const router = useRouter();
	const pathname = usePathname();
	const currentLocale = useLocale();

	const handleChange = (details: SwitchCheckedChangeDetails) => {
		const locale = details.checked ? "en" : "ru";
		// @ts-ignore
		router.replace(pathname, { locale });
		// router.push(pathname, { locale: e.target.value });
	};

	return {
		currentLocale,
		handleChange,
	};
};
