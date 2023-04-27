import { LoadingSpinner } from "@/components/LoadingSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import { ZodType, z } from "zod";

interface LoginData {
  username: string;
  password: string;
}

type Provider = "google" | "github" | "discord";

const SignIn = () => {
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
    toggleLoadingToast();
    signIn("credentials", { email: username, password, callbackUrl: "/" });
  };

  const toggleLoadingToast = () => {
    const theme = JSON.parse(localStorage.getItem("theme") || "");
    let palette;
    if (!theme) {
      palette = "light";
    } else {
      palette = theme;
    }
    toast.loading("Redirecting...", {
      position: "bottom-right",
      style: {
        backgroundColor: palette === "light" ? "#FFF" : "#000",
        color: palette === "light" ? "#000" : "#FFF",
      },
    });
  };

  const handleProviderClick = (provider: Provider) => {
    toggleLoadingToast();
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <section className="container max-w-2xl mx-auto text-center px-2 mt-2">
      <h3 className="text-4xl font-semibold mb-1 dark:text-white">
        Welcome back!
      </h3>
      <h4 className="text-xl font-medium text-sky-400 mb-2">
        Choose a login feature of your liking
      </h4>
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
      <div className="flex items-center gap-1 max-w-md my-2 mx-auto text-zinc-500 text-lg">
        <div className="h-[1px] flex-1 bg-zinc-500"></div>
        <div>
          <span className="font-medium">or</span>
        </div>
        <div className="h-[1px] flex-1 bg-zinc-500"></div>
      </div>
      <div className="flex flex-col gap-2 max-w-xs mx-auto">
        <button
          className="group flex items-center justify-center text-md font-semibold p-2 border-2 shadow-md border-zinc-500 rounded"
          onClick={() => handleProviderClick("google")}
        >
          <FaGoogle
            className="ml-2 duration-200 transition-all group-hover:text-sky-500 group-hover:translate-x-32 dark:text-zinc-400"
            size={30}
          />
          <span className="flex-1 -ml-2 duration-200 transition-opacity group-hover:opacity-0 dark:text-zinc-400">
            Sign in with Gmail
          </span>
        </button>
        <button
          className="group flex items-center justify-center text-md font-semibold p-2 border-2 shadow-md border-zinc-500 rounded"
          onClick={() => handleProviderClick("github")}
        >
          <FaGithub
            className="ml-2 duration-200 transition-all group-hover:text-sky-500 group-hover:translate-x-32 dark:text-zinc-400"
            size={30}
          />
          <span className="flex-1 -ml-2 duration-200 transition-opacity group-hover:opacity-0 dark:text-zinc-400">
            Sign in with GitHub
          </span>
        </button>
        <button
          className="group flex items-center justify-center text-md font-semibold p-2 border-2 shadow-md border-zinc-500 rounded"
          onClick={() => handleProviderClick("discord")}
        >
          <FaDiscord
            className="ml-2 duration-200 transition-all group-hover:text-sky-500 group-hover:translate-x-32 dark:text-zinc-400"
            size={30}
          />
          <span className="flex-1 -ml-2 duration-200 transition-opacity group-hover:opacity-0 dark:text-zinc-400">
            Sign in with Discord
          </span>
        </button>
      </div>
      <p className="text-lg mt-4 dark:text-white">
        Doesn't have an account? Click{" "}
        <Link
          href={"/api/auth/signin"}
          className="text-sky-400 underline dark:text-sky-500"
        >
          here
        </Link>{" "}
        and go to the Sign Up page.
      </p>
    </section>
  );
};

export default SignIn;
