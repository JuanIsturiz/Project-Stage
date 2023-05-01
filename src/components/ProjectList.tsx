import { FC } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Project from "./Project";
import LoadingSkeleton from "./loaders/LoadingProjects";

interface ProjectListProps {
  projects: IProject[] | undefined;
  isLoading: boolean;
  onProjectClick: (project: IProject) => void;
}

const ProjectList: FC<ProjectListProps> = ({
  projects,
  isLoading,
  onProjectClick,
}) => {
  const [parent] = useAutoAnimate();
  return (
    <div
      ref={parent}
      className="flex gap-4 flex-wrap justify-center mb-2 md:block"
    >
      {isLoading ? (
        <LoadingSkeleton qty={4} />
      ) : (
        projects?.map((project) => (
          <Project
            key={project.id}
            project={project}
            onProjectClick={() => onProjectClick(project)}
          />
        ))
      )}
    </div>
  );
};

export default ProjectList;
