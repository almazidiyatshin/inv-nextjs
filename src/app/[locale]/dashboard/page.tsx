import { DashboardPage } from "screen";
import type { TPageProps } from "./types";

export default function Page({ params: { locale } }: TPageProps) {
	return <DashboardPage locale={locale} />;
}
