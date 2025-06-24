/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	i18n: {
		locales: ['en-US'],
		defaultLocale: 'en-US',
	},
	images: {
		domains: ['avatars.githubusercontent.com'],
	},
	experimental: {
		optimizePackageImports: ['@chakra-ui/react'],
	},
	async redirects() {
		return [
			{
				source: '/dashboard',
				destination: '/en/dashboard',
				permanent: false,
			},
		];
	},
};

export default nextConfig;