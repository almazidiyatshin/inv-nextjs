import { Loader } from "@chakra-ui/react";
import { Suspense } from "react";
import { PortfolioManagementPage } from "screen";

export default function Page() {
	return (
		<Suspense fallback={<Loader />}>
			<PortfolioManagementPage />
		</Suspense>
	);
}
