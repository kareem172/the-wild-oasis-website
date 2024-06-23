import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfigs = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getGuest(user.email);
        if (!existingUser) {
          await createGuest({
            fullName: user.name,
            email: user.email,
          });
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    async session({ session, user }) {
      const existingUser = await getGuest(session.user.email);
      session.user.guestId = existingUser?.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
export const { handlers, auth, signIn, signOut } = NextAuth(authConfigs);
