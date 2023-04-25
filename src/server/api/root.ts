import { router } from "./trpc";
import { projectRouter } from "./routes/project";
import { taskRouter } from "./routes/task";

export const appRouter = router({
  project: projectRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
