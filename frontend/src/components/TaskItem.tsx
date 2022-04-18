import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ITask } from "shared/types";

import { TaskStatus } from "../types";
import { useRequest } from "../hooks";
import "./TaskItem.css";

function TaskItem({
  task,
  refreshTaskList,
}: {
  task: ITask;
  refreshTaskList: () => void;
}) {
  const { post } = useRequest();
  const [done, setDone] = useState(task.status === TaskStatus.Done);

  function handleTaskStatus() {
    post("/task/update", {
      ...task,
      status: done ? TaskStatus.NotDone : TaskStatus.Done,
    })
      .then((task) => {
        setDone(task.status === TaskStatus.Done);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDeleteTask() {
    post("/task/delete", {
      uuid: task.uuid,
    })
      .then(() => {
        refreshTaskList();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="task">
      <div className="task-title">
        <input
          type="checkbox"
          checked={done}
          onChange={handleTaskStatus}
        ></input>
        <div className={done ? "line-through" : ""}>
          {task.index?.toString() + ". " + task.title}
        </div>
      </div>
      <button className="icon-button delete-button" onClick={handleDeleteTask}>
        <RiDeleteBin6Line />
      </button>
    </div>
  );
}

export { TaskItem };
