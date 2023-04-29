import { z } from "zod";
import { procedure, router } from "../trpc";

export const taskRouter = router({
  getAll: procedure
    .input(
      z.object({
        projectId: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const tasks = await ctx.prisma.task.findMany({
        where: {
          projectId: input.projectId,
        },
      });
      return tasks;
    }),
  create: procedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().nullable(),
        dueTo: z.date(),
        projectId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.create({
        data: {
          title: input.title,
          description: input.description,
          dueTo: input.dueTo,
          projectId: input.projectId,
        },
      });
      return task;
    }),
});
