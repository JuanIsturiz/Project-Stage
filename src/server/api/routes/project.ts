import { procedure, router } from "../trpc";

export const projectRouter = router({
  getAll: procedure.query(async ({ ctx }) => {}),
});
