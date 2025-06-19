import GithubProvider from "next-auth/providers/github";

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
	],
	callbacks: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		async jwt({ token, user, account }) {
			if (account && user) {
				token.role = user.email === process.env.ADMIN_EMAIL ? "admin" : "user";
			}
			return token;
		},
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		async session({ session, token }) {
			if (token) {
				session.user.id = token.sub;
				session.user.role = token.role;
			}
			return session;
		},
	},
};
