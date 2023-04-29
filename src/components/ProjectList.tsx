import { useAutoAnimate } from "@formkit/auto-animate/react";
import Project from "./Project";
import LoadingProjects from "./loaders/LoadingProjects";
import { FC } from "react";

interface ProjectListProps {
  projects: IProject[] | undefined;
  isLoading: boolean;
}

const ProjectList: FC<ProjectListProps> = ({ projects, isLoading }) => {
  const [parent] = useAutoAnimate();
  return (
    <div
      ref={parent}
      className="flex gap-4 flex-wrap justify-center mb-2 md:block"
    >
      {isLoading ? (
        <LoadingProjects />
      ) : (
        projects?.map((project) => (
          <Project key={project.id} project={project} />
        ))
      )}
    </div>
  );
};

export default ProjectList;
