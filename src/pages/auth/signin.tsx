import LoginForm from "@/components/LoginForm";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";

const callbackUrl = "/dashboard";

type Provider = "google" | "github" | "discord";

const SignIn = () => {
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
    signIn(provider, { callbackUrl });
  };

  return (
    <section className="container max-w-2xl mx-auto text-center px-2 mt-2">
      <h3 className="text-4xl font-semibold mb-1 dark:text-white">
        Welcome back!
      </h3>
      <h4 className="text-xl font-medium text-sky-400 mb-2">
        Choose a login feature of your liking
      </h4>
      <LoginForm onToast={toggleLoadingToast} />
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
        Doesn&apos;t have an account? Click{" "}
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

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async ({ req }: GetServerSidePropsContext) => {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default SignIn;
