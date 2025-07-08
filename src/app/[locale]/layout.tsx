import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "shared/lib/i18n/routing";

import { ChakraProvider, StoreProvider, ToastProvider } from "shared/providers";
import { Header } from "widget/page";

export const metadata: Metadata = {
	title: "Investly",
	description: "Investment tracker",
};

type TRootLayoutProps = {
	children: React.ReactNode;
	params: { locale: string };
};

export default async function RootLayout({
	children,
	params,
}: TRootLayoutProps) {
	const { locale } = params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html suppressHydrationWarning lang={locale}>
			<body>
				<NextIntlClientProvider>
					<ChakraProvider>
						<StoreProvider>
							<Header />
							{children}
						</StoreProvider>
						<ToastProvider />
					</ChakraProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
