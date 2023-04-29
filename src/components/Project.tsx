import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { LoadingSpinner } from "./loaders/LoadingSpinner";
import { api } from "@/utils/trpc";

const Project: FC<{ project: IProject }> = ({ project }) => {
  const { id, title } = project;

  const ctx = api.useContext();
  const { mutate: deleteProject, isLoading } = api.project.remove.useMutation({
    onSuccess() {
      ctx.project.getAll.invalidate();
    },
  });

  const handleDelete = () => {
    deleteProject({ id });
  };

  return (
    <div className="group/project flex justify-center items-center gap-2 md:mb-3">
      <div
        key={id}
        className="basis-48 cursor-pointer text-center text-white font-medium text-lg px-4 py-2 bg-sky-400 rounded-xl shadow-md hover:bg-sky-500 dark:bg-[#0353a4] dark:hover:bg-sky-700"
      >
        <p>{title}</p>
      </div>
      <div
        className={`${
          isLoading ? "block" : "hidden"
        } group-hover/project:block`}
      >
        <button
          className="delete-project cursor-pointer bg-white p-2 rounded-full shadow-md  hover:scale-110"
          onClick={handleDelete}
        >
          {isLoading ? (
            <LoadingSpinner size={20} />
          ) : (
            <FaTrash size={20} className="text-red-600" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Project;
