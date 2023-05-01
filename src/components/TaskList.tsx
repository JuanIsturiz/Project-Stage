import { FC } from "react";
import Task from "./Task";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import LoadingSkeleton from "./loaders/LoadingProjects";

interface TaskListProps {
  tasks: ITask[] | undefined;
  isLoading: boolean;
}

const TaskList: FC<TaskListProps> = ({ tasks, isLoading }) => {
  const [parent] = useAutoAnimate();

  return isLoading ? (
    <LoadingSkeleton qty={1} />
  ) : (
    <div ref={parent}>
      {tasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
