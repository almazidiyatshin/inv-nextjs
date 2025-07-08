/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('src/shared/lib/i18n/request.ts');

const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ['avatars.githubusercontent.com'],
	},
	experimental: {
		optimizePackageImports: ['@chakra-ui/react'],
	},
};

export default withNextIntl(nextConfig);