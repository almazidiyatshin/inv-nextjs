import type { Metadata } from "next";
import { ChakraProvider, StoreProvider } from "shared/providers";

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
				</ChakraProvider>
			</body>
		</html>
	);
}
