import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

interface RegisterData {
  username: String;
  email: String;
  password: String;
  confirmPassword: String;
}

export default function Register() {
  const schema: ZodType<RegisterData> = z
    .object({
      username: z
        .string()
        .min(2, "Username must contain at least 2 character(s)")
        .max(30, "Username must contain at most 30 character(s)"),
      email: z.string().email("Please enter a valid email"),
      password: z
        .string()
        .min(8, "Password must contain at least 8 character(s)")
        .max(30, "Password must contain at most 30 character(s)"),
      confirmPassword: z
        .string()
        .min(8, "Password Confirmation must contain at least 8 character(s)")
        .max(30, "Password Confirmation must contain at most 30 character(s)"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: RegisterData) => {
    console.log(data);
  };

  return (
    <section className="container max-w-2xl mx-auto text-center px-2 mt-2">
      <h3 className="text-4xl font-semibold mb-1">Register</h3>
      <h4 className="text-xl font-medium text-sky-400 mb-2">
        Please fill up all the fields to join the Project Stage team
      </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center w-9/12 mx-auto">
          <div className="flex flex-col items-start gap-1 w-11/12 mb-2">
            <label className="text-lg font-medium" htmlFor="username">
              Username:
            </label>
            <input
              className="text-lg rounded-lg w-full py-1 focus:border-sky-400 focus:border-2"
              type="text"
              id="username"
              {...register("username", { required: true })}
              placeholder="First name..."
            />
            {errors.username && (
              <span className="text-red-500 -mb-2">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start gap-1 w-11/12 mb-2">
            <label className="text-lg font-medium" htmlFor="email">
              Email:
            </label>
            <input
              className="text-lg rounded-lg w-full py-1 focus:border-sky-400 focus:border-2"
              type="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="Email..."
            />
            {errors.email && (
              <span className="text-red-500 -mb-2">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col items-start gap-1 w-11/12 mb-2">
            <label className="text-lg font-medium" htmlFor="password">
              Password Name:
            </label>
            <input
              className="text-lg rounded-lg w-full py-1 focus:border-sky-400 focus:border-2"
              type="password"
              id="password"
              {...register("password", { required: true })}
              placeholder="Password..."
            />
            {errors.password && (
              <span className="text-red-500 -mb-2">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start gap-1 w-11/12 mb-2">
            <label className="text-lg font-medium" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className="text-lg rounded-lg w-full py-1 focus:border-sky-400 focus:border-2"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm Password..."
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <input
            className="cursor-pointer text-xl text-white rounded-lg bg-sky-300 py-2 px-4 font-medium mx-auto outline-2 outline transition-all duration-200 ease-linear outline-sky-300 hover:outline-offset-2"
            type="submit"
          />
        </div>
      </form>
      <p className="text-lg mt-2">
        Already have an account? Click{" "}
        <Link href={""} className="text-sky-300 underline">
          here
        </Link>{" "}
        and go to Sign In page.
      </p>
    </section>
  );
}
