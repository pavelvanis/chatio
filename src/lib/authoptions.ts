import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
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

        const login = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: email, password: password }),
        });
        const res = await login.json();

        if (login.ok) {
          return res;
        } else {
          throw new Error(res.message);
        }
      },
    }),
  ],
};

export default authOptions;
