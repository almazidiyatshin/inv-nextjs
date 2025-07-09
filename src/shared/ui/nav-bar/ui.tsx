import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "shared/lib/i18n/navigation";
import { urls } from "./constants";
import { useModel } from "./useModel";

export const NavBar = () => {
	const { texts, currentPath } = useModel();

	return (
		<>
			<ChakraLink
				asChild
				fontWeight={currentPath === urls.main ? "bold" : "normal"}
				_focus={{
					outline: "none",
				}}
			>
				<Link href={urls.main}>{texts.dashboard}</Link>
			</ChakraLink>
			<ChakraLink
				asChild
				fontWeight={
					currentPath === urls.portfolioManagement ? "bold" : "normal"
				}
				_focus={{
					outline: "none",
				}}
			>
				<Link href={urls.portfolioManagement}>{texts.portfolioManagement}</Link>
			</ChakraLink>
		</>
	);
};
