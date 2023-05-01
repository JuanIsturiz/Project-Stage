import { FC, useEffect } from "react";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdPostAdd } from "react-icons/md";
import { LoadingSpinner } from "./loaders/LoadingSpinner";
import { api } from "@/utils/trpc";
interface ProjectData {
  title: string;
}

const NewProjectForm: FC = () => {
  const schema: ZodType<ProjectData> = z.object({
    title: z.string().trim().nonempty(),
  });
  const { register, handleSubmit, reset } = useForm<ProjectData>({
    resolver: zodResolver(schema),
  });

  const ctx = api.useContext();

  const { mutate: createProject, isLoading } = api.project.create.useMutation({
    onSuccess() {
      ctx.project.getAll.invalidate();
      reset();
    },
  });
  const onSubmit = (data: ProjectData) => {
    createProject({ title: data.title });
  };

  return (
    <>
      <h4 className="text-lg font-medium mb-1 dark:text-white">New Project</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center pr-1 rounded shadow-md bg-white dark:bg-zinc-900">
          <input
            className="w-full bg-transparent border-0 border-transparent px-1 rounded focus:border-transparent focus:ring-0 dark:text-zinc-200"
            type="text"
            placeholder="Learn Docker..."
            {...register("title")}
          />
          <button disabled={isLoading} type="submit">
            {isLoading ? (
              <LoadingSpinner size={24} />
            ) : (
              <MdPostAdd
                size={30}
                className="text-zinc-400 hover:text-sky-400 dark:text-zinc-700 dark:hover:text-sky-600"
              />
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default NewProjectForm;
