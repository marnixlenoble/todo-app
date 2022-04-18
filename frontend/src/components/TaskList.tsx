import { ITask } from "shared/types";
import "./TaskList.css";

import { TaskItem } from "./TaskItem";

function TaskList({ tasks, refreshTaskList }: { tasks: Array<ITask>, refreshTaskList: () => void }) {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          index={index}
          task={task}
          refreshTaskList={refreshTaskList}
          key={task.uuid}
        ></TaskItem>
      ))}
    </div>
  );
}

export { TaskList };
