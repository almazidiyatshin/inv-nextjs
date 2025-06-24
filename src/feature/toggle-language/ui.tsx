"use client";

import { Button, ButtonGroup } from "@chakra-ui/react";
import { useModel } from "./useModel";

export const LanguageToggleButton = () => {
	const { t, currentLocale, locales, handleChangeLocale } = useModel();

	return (
		<ButtonGroup size={"xs"} variant="solid" attached>
			{locales.map((locale) => (
				<Button
					key={locale}
					title={`${t("changeLanguage")} ${locale}`}
					disabled={locale === currentLocale}
					onClick={() => handleChangeLocale(locale)}
				>
					{locale}
				</Button>
			))}
		</ButtonGroup>
	);
};
