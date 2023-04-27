import { z } from "zod";
import bcrypt from "bcrypt";
import { procedure, router } from "../trpc";

export const userRouter = router({
  addUser: procedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { username, email, password } = input;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await ctx.prisma.user.create({
        data: {
          name: username,
          email,
          password: hashedPassword,
        },
      });
      return user;
    }),
});

// model User {
//   id            String    @id @default(cuid())
//   name          String?
//   email         String?   @unique
//   emailVerified DateTime?
//   image         String?
//   password      String?
//   projects      Project[]
//   accounts      Account[]
//   sessions      Session[]
// }
