import { FC } from "react";

interface TaskListProps {
  tasks: ITask[] | undefined;
  isLoading: boolean;
}

const TaskList: FC<TaskListProps> = () => {
  return <div>TaskList</div>;
};

export default TaskList;
