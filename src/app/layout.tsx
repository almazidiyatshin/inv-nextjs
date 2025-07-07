import type { Metadata } from "next";
import { ChakraProvider, StoreProvider, ToastProvider } from "shared/providers";
import { Header } from "widget/page";

export const metadata: Metadata = {
	title: "Investly",
	description: "Investment tracker",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body>
				<ChakraProvider>
					<StoreProvider>
						<Header />
						{children}
					</StoreProvider>
					<ToastProvider />
				</ChakraProvider>
			</body>
		</html>
	);
}
