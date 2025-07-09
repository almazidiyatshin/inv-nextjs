import { useDisclosure } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export const useModel = () => {
	const t = useTranslations();
	const { open, onOpen, onClose } = useDisclosure();

	const texts = {
		title: t("investly"),
		language: t("language"),
		darkMode: t("darkMode"),
	};

	return { texts, open, onOpen, onClose };
};
