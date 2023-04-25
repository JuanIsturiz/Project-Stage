import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "@/server/db";

export const createTRPCContext = (opts: CreateNextContextOptions) => {
  const { req } = opts;

  return {
    prisma,
  };
};
