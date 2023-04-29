import NewProjectForm from "@/components/NewProjectForm";
import NewTaskForm from "@/components/NewTaskForm";
import ProjectList from "@/components/ProjectList";
import TaskList from "@/components/TaskList";
import { api } from "@/utils/trpc";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useState } from "react";

// todo finish tasklist
// todo add task component
//? check tasks query functionality

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  // Project query
  const { data: projects, isLoading: isLoadingProjects } =
    api.project.getAll.useQuery(undefined, {
      onSuccess(data) {
        setSelectedProject(selectedProject ?? data[0] ?? null);
      },
    });

  // Task query
  const { data: tasks, isLoading: isLoadingTasks } = api.task.getAll.useQuery(
    { projectId: selectedProject?.id ?? "" },
    {
      enabled: !!selectedProject && selectedProject !== null,
    }
  );
  return (
    <section className="max-w-6xl mx-auto px-4 mt-4">
      <div className="grid grid-rows-4 grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-1 md:gap-2">
        <div className="row-span-1 md:col-span-1">
          <div className="p-2 shadow-md bg-sky-200 rounded dark:bg-[#001845]">
            <h3 className="text-2xl text-center border-b-[1px] border-b-sky-50 font-medium mb-2 dark:text-white">
              Projects
            </h3>
            <NewProjectForm />
            <hr className="my-4 border-sky-50 dark:border-zinc-600" />
            <ProjectList projects={projects} isLoading={isLoadingProjects} />
          </div>
        </div>
        <div className="row-span-3 md:col-span-3 bg-zinc-50">
          <div className="p-2 shadow-md rounded">
            <h3 className="text-2xl text-center border-b-[1px] font-medium mb-2 dark:text-white">
              Tasks
            </h3>
            <NewTaskForm />
            <hr className="my-4 dark:border-zinc-600" />
            <TaskList tasks={tasks} isLoading={isLoadingTasks} />
          </div>
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
