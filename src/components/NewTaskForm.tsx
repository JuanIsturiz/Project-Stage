import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCheck } from "react-icons/fa";
import { FC, useEffect, useState } from "react";
import { api } from "@/utils/trpc";
import { LoadingSpinner } from "./loaders/LoadingSpinner";

interface TaskData {
  title: string;
  description?: string;
  dueTo: Date;
}

const NewTaskForm: FC<{ selectedProject: IProject | null }> = ({
  selectedProject,
}) => {
  const [visible, setVisible] = useState(false);

  const schema: ZodType<TaskData> = z.object({
    title: z.string().nonempty(),
    description: z.string(),
    dueTo: z.date(),
  });

  const { register, handleSubmit, reset } = useForm<TaskData>({
    resolver: zodResolver(schema),
  });

  const ctx = api.useContext();
  const { mutate: createTask, isLoading } = api.task.create.useMutation({
    onSuccess() {
      ctx.task.getAll.invalidate();
      reset();
    },
  });

  useEffect(() => {
    reset();
  }, [selectedProject]);

  const onSubmit = (data: TaskData) => {
    if (!selectedProject) return;
    createTask({
      title: data.title,
      description: data.description || null,
      dueTo: data.dueTo,
      projectId: selectedProject.id,
    });
  };

  return (
    <>
      <h4
        className="select-none cursor-pointer text-lg underline font-medium mb-1 dark:text-white"
        onClick={() => setVisible(!visible)}
      >
        New Task
      </h4>
      <div
        className={`${
          visible ? "h-[19rem]" : "h-0"
        } overflow-y-hidden duration-200 transition-all`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-2">
            <label
              className="text-lg font-medium dark:text-white"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="rounded border-zinc-200 focus:ring-sky-400 focus:ring-2 focus:border-transparent dark:bg-zinc-900 dark:border-zinc-700 dark: text-zinc-100 dark:filter"
              type="text"
              id="title"
              placeholder="Refactor App.tsx..."
              {...register("title")}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label
              className="text-lg font-medium dark:text-white"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="rounded border-zinc-200 focus:ring-sky-400 focus:ring-2 focus:border-transparent dark:bg-zinc-900 dark:border-zinc-700 dark: text-zinc-100 dark:filter"
              id="description"
              placeholder="Move fetchPost() to a separate component..."
              {...register("description")}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label
              className="text-lg font-medium dark:text-white"
              htmlFor="dueTo"
            >
              Due To
            </label>
            <input
              className="rounded border-zinc-200 focus:ring-sky-400 focus:ring-2 focus:border-transparent dark:bg-zinc-900 dark:border-zinc-700 dark: text-zinc-100"
              type="date"
              {...register("dueTo", { valueAsDate: true })}
            />
          </div>
          <button
            disabled={isLoading}
            className="group mx-auto flex gap-4 items-center py-2 px-4 font-medium text-white bg-sky-400 rounded shadow-md dark:bg-sky-900"
          >
            Create Task
            {isLoading ? (
              <LoadingSpinner size={20} />
            ) : (
              <FaCheck className=" duration-150 transition-transform group-hover:scale-150" />
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default NewTaskForm;
