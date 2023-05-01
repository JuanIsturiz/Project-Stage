import { z } from "zod";
import { procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

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
      const fixedDate = new Date(
        input.dueTo.setDate(input.dueTo.getDate() + 1)
      );
      await ctx.prisma.task.create({
        data: {
          title: input.title,
          description: input.description,
          dueTo: fixedDate,
          projectId: input.projectId,
        },
      });
      return true;
    }),
  remove: procedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      });
      return true;
    }),
  update: procedure
    .input(
      z.object({
        id: z.string(),
        value: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.task.update({
        where: { id: input.id },
        data: { completed: input.value },
      });
      return true;
    }),
});
