import { useDisclosure } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export const useModel = () => {
	const t = useTranslations();
	const pathname = usePathname();
	const { open, onOpen, onClose } = useDisclosure();

	const texts = {
		title: t("investly"),
		language: t("language"),
		darkMode: t("darkMode"),
		dashboard: t("dashboard"),
		portfolioManagement: t("portfolioManagement"),
	};

	return { texts, currentPath: pathname.split("/")[2], open, onOpen, onClose };
};
