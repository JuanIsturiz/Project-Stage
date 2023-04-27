import { env } from "@/env.mjs";
import { NextAuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import { GetServerSidePropsContext } from "next";
import bcrypt from "bcrypt";

export const AuthOptions: NextAuthOptions = {
  jwt: {
    secret: "test",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session: incoming, token }) => {
      if (token) {
        // session.id = token.id;
      }
      const session = { ...incoming, id: token.id };
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials, _req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const dbUser = await prisma.user.findFirst({
          where: { email: email.toLowerCase() },
        });
        if (!dbUser) throw new Error("No user found");

        if (!dbUser.password)
          throw new Error("Please Sign Up first to log in using credentials");

        const passwordCheck = await bcrypt.compare(password, dbUser.password);

        if (!passwordCheck) throw new Error("Password doesn't match");
        const user = {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email ?? "",
          image: dbUser.image ?? "",
        };

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, AuthOptions);
};
