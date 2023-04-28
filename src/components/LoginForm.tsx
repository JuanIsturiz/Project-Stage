import { LoadingSpinner } from "@/components/loaders/LoadingSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";

interface LoginData {
  username: string;
  password: string;
}

const callbackUrl = "/dashboard";

const LoginForm: FC<{ onToast: () => void }> = ({ onToast }) => {
  const [isLoading, setIsLoading] = useState(false);

  const schema: ZodType<LoginData> = z.object({
    username: z.string().email("Please provide a valid email"),
    password: z.string().nonempty("Please provide a password"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginData) => {
    const { username, password } = data;
    setIsLoading(true);
    onToast();
    signIn("credentials", { email: username, password, callbackUrl });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center w-9/12 mx-auto mb-3">
        <div className="flex flex-col items-start gap-1 w-11/12 mb-2">
          <label
            className="text-lg font-medium dark:text-white"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className="text-lg rounded-lg w-full py-1 focus:border-sky-400 focus:border-2 dark:bg-zinc-900 dark:text-white  "
            type="email"
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
        <button
          disabled={isLoading}
          className="cursor-pointer text-xl text-white rounded-lg bg-sky-400 py-2 px-4 mt-2 font-medium mx-auto outline-2 outline transition-all duration-200 ease-linear outline-sky-400 hover:animate-pulse hover:outline-offset-2 dark:bg-sky-500 dark:outline-sky-500"
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

export default LoginForm;
