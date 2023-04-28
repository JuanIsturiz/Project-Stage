import Link from "next/link";
import { api } from "@/utils/trpc";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  const { replace } = useRouter();

  const { mutate: createUser, isLoading } = api.user.addUser.useMutation({
    onSuccess() {
      replace("/api/auth/signin");
    },
    onError(error) {
      const errorMessage = error.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  return (
    <section className="container max-w-2xl mx-auto text-center px-2 mt-2">
      <h3 className="text-4xl font-semibold mb-1 dark:text-white">Register</h3>
      <h4 className="text-xl font-medium text-sky-400 mb-2">
        Please fill up all the fields to join the Project Stage team
      </h4>
      <RegisterForm onCreate={createUser} isLoading={isLoading} />
      <p className="text-lg mt-2 dark:text-white">
        Already have an account? Click{" "}
        <Link
          href={"/api/auth/signin"}
          className="text-sky-300 underline dark:text-sky-500"
        >
          here
        </Link>{" "}
        and go to Sign In page.
      </p>
    </section>
  );
}

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
