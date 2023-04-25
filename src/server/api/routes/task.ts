import { procedure, router } from "../trpc";

export const taskRouter = router({
  getAll: procedure.query(async ({ ctx }) => {}),
});
