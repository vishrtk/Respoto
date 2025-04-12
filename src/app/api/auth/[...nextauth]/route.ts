import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    // Demo provider for testing without Facebook
    CredentialsProvider({
      name: 'Demo Account',
      credentials: {},
      async authorize() {
        // Return a demo user for testing
        return {
          id: 'demo-user',
          name: 'Demo User',
          email: 'demo@example.com',
          image: 'https://via.placeholder.com/150',
          accessToken: 'demo-access-token'
        };
      },
    }) ,
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Add access token to the token right after sign in
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add access token and user ID to the session
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
