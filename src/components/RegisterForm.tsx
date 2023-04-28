import { FC } from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingSpinner } from "@/components/loaders/LoadingSpinner";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IUserInfo {
  username: string;
  email: string;
  password: string;
}

const RegisterForm: FC<{
  onCreate: (userInfo: IUserInfo) => void;
  isLoading: boolean;
}> = ({ onCreate, isLoading }) => {
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
    const { username, email, password } = data;
    onCreate({ username, email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center w-9/12 mx-auto">
        <div className="flex flex-col items-start gap-1 w-11/12 mb-2">
          <label
            className="text-lg font-medium dark:text-white"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className="text-lg rounded-lg w-full py-1 focus:border-sky-400 focus:border-2 dark:bg-zinc-900 dark:text-white  "
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
          <label
            className="text-lg font-medium dark:text-white"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="text-lg rounded-lg w-full py-1 focus:border-sky-400 focus:border-2 dark:bg-zinc-900 dark:text-white"
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
          <label
            className="text-lg font-medium dark:text-white"
            htmlFor="password"
          >
            Password Name:
          </label>
          <input
            className="text-lg rounded-lg w-full py-1 focus:border-sky-400 focus:border-2 dark:bg-zinc-900 dark:text-white"
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
          <label
            className="text-lg font-medium dark:text-white"
            htmlFor="confirmPassword"
          >
            Confirm Password:
          </label>
          <input
            className="text-lg rounded-lg w-full py-1 focus:border-sky-400 focus:border-2 dark:bg-zinc-900 dark:text-white"
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
        <button
          disabled={isLoading}
          className="cursor-pointer text-xl text-white rounded-lg bg-sky-400 py-2 px-4 font-medium mx-auto outline-2 outline transition-all duration-200 ease-linear outline-sky-400 hover:outline-offset-2 hover:animate-pulse dark:bg-sky-500 dark:outline-sky-500"
          type="submit"
        >
          <span className="flex justify-center items-center gap-2 dark:text-black">
            Submit{isLoading && <LoadingSpinner size={22} />}
          </span>
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
