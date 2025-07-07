import { Loader } from "@chakra-ui/react";
import { Suspense } from "react";
import { DashboardPage } from "screen";

export default function Page() {
	return (
		<Suspense fallback={<Loader />}>
			<DashboardPage />
		</Suspense>
	);
}
