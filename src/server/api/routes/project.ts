import { z } from "zod";
import { procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const projectRouter = router({
  getAll: procedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    const projects = await ctx.prisma.project.findMany({ where: { userId } });
    return projects;
  }),
  create: procedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });
      const project = await ctx.prisma.project.create({
        data: {
          title: input.title,
          userId,
        },
      });
      return project;
    }),
  remove: procedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.project.delete({ where: { id: input.id } });
      return true;
    }),
});
