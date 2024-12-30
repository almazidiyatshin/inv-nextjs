/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		locales: ['en-US'],
		defaultLocale: 'en-US',
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
