import type { Metadata } from "next";
import { ChakraProvider, StoreProvider, ToastProvider } from "shared/providers";

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
					<StoreProvider>{children}</StoreProvider>
					<ToastProvider />
				</ChakraProvider>
			</body>
		</html>
	);
}
