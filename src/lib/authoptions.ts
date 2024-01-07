import { IUser } from "@/models/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      // console.log("jwt callback", { token, user, session });
      if (user) {
        return { user: user };
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session callback", { session, token });

      const user = token.user as IUser;

      return { ...session, user: { ...user } };
    },
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        // destructuralize credentials
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const login = await fetch(`http://localhost:3000/api/auth/login`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });

        const { user, token } = await login.json();

        console.log(token);

        if (login.ok) {
          return { ...user, token };
        } else {
          throw new Error(user.message);
        }
      },
    }),
  ],
};

export default authOptions;
