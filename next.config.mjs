/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		locales: ['en-US'],
		defaultLocale: 'en-US',
	},
	images: {
		domains: ['avatars.githubusercontent.com'],
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
