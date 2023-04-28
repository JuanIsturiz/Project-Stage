import NewProjectForm from "@/components/NewProjectForm";
import ProjectList from "@/components/ProjectList";
import { api } from "@/utils/trpc";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";

const Dashboard = (props: { session: Session }) => {
  const { data: session } = useSession();
  const { data } = api.project.getAll.useQuery();
  return (
    <section className="max-w-6xl mx-auto px-4 mt-4 min-h-full">
      <div className="grid grid-rows-2 grid-cols-1 md:grid-cols-4 md:grid-rows-1 gap-2">
        <div className="md:col-span-1">
          <div className="p-2 shadow-md bg-sky-200 rounded dark:bg-sky-900">
            <h3 className="text-2xl font-medium mb-2 dark:text-white">
              Projects
            </h3>
            <h4 className="text-lg font-medium mb-1 dark:text-white">
              New Project
            </h4>
            <NewProjectForm />
            <hr className="my-4 dark:border-zinc-600" />
            <ProjectList />
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="shadow-md">Tasks</div>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async ({ req }: GetServerSidePropsContext) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "auth/signin",
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

export default Dashboard;
