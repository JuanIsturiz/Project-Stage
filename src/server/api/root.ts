import { router } from "./trpc";
import { projectRouter } from "./routes/project";
import { taskRouter } from "./routes/task";
import { userRouter } from "./routes/user";

export const appRouter = router({
  project: projectRouter,
  task: taskRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
