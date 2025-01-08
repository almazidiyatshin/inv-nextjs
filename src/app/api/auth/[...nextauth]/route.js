import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (account && user) {
				token.role = user.email === 'dev@tshin.ru' ? 'admin' : 'user';
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.sub;
				session.user.role = token.role;
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
