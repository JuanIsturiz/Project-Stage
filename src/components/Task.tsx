import { FC, MouseEventHandler, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaTrash } from "react-icons/fa";
import { LoadingSpinner } from "./loaders/LoadingSpinner";
import { api } from "@/utils/trpc";
import { toast } from "react-hot-toast";
dayjs.extend(relativeTime);
interface TaskProps {
  task: ITask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const { id, title, description, completed, dueTo, updatedAt, projectId } =
    task;
  const [expanded, setExpanded] = useState(false);

  const ctx = api.useContext();

  const { mutate: deleteTask, isLoading } = api.task.remove.useMutation({
    onSuccess() {
      ctx.task.getAll.invalidate();
    },
  });

  const { mutate: updateTask } = api.task.update.useMutation({
    onMutate() {
      ctx.task.getAll.cancel({ projectId });
      const previousTasks = ctx.task.getAll.getData({ projectId });
      ctx.task.getAll.setData({ projectId }, (old) => {
        return old?.map((t) =>
          t.id === id ? { ...t, completed: !completed } : t
        );
      });
      return { previousTasks };
    },
    onError(err, _newTasks, context) {
      ctx.task.getAll.setData({ projectId }, context?.previousTasks);
      toast.error(err.message);
    },
  });

  const handleDeleteClick = () => {
    deleteTask({ id });
  };

  const handleExpandClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement;
    if (target.nodeName === "BUTTON" || target.nodeName === "INPUT") return;
    setExpanded(!expanded);
  };

  const handleCompletedCheck = () => {
    updateTask({ id, value: !completed });
  };

  return (
    <div
      className={` ${
        expanded ? "max-h-80" : "max-h-11"
      } group cursor-pointer p-2 mb-4 shadow-md bg-sky-200 overflow-hidden transition-all duration-200 rounded dark:bg-sky-900`}
      onClick={handleExpandClick}
    >
      <div className="flex items-center justify-between transition-all duration-200 group-hover:pl-4 dark:text-white">
        <div className="flex items-center gap-2">
          <h3 className="cursor-pointer text-2xl">{title}</h3>
          <span className="hidden text-2xl md:block dark:text-white">·</span>
          <span className="hidden text-lg text-zinc-500 md:block dark:text-zinc-300">
            {dayjs(updatedAt).fromNow()}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            className="cursor-pointer text-sky-500 rounded dark:text-sky-600"
            checked={completed}
            onChange={() => {}}
            onClick={handleCompletedCheck}
          />
          <span className="text-lg">{completed ? "Completed" : "Pending"}</span>
        </div>
      </div>
      <div
        className={`rounded max-h-52 dark:text-white ${
          expanded && "overflow-y-auto"
        }`}
      >
        <p>{description}</p>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <h5 className="text-lg font-semibold dark:text-white">
          Due To: {dueTo.toDateString()}
        </h5>
        <button
          className="group/delete z-50 flex gap-2 items-center px-2 py-1 bg-red-400 dark:bg-red-600 font-medium rounded dark:text-white"
          onClick={handleDeleteClick}
        >
          Delete
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <FaTrash className="transition-transform duration-200 group-hover/delete:scale-125" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Task;
