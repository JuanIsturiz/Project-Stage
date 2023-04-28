import { api } from "@/utils/trpc";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Project from "./Project";
import LoadingProjects from "./loaders/LoadingProjects";

const ProjectList = () => {
  const [parent] = useAutoAnimate();
  const { data: projects, isLoading } = api.project.getAll.useQuery();
  return (
    <div
      ref={parent}
      className="flex gap-4 flex-wrap justify-center mb-2 md:block"
    >
      {isLoading ? (
        <LoadingProjects />
      ) : (
        projects?.map((project) => <Project project={project} />)
      )}
    </div>
  );
};

export default ProjectList;
