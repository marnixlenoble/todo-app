import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ITask } from "shared/types";

import { useRequest } from "../hooks";
import { TaskList } from "./TaskList";
import { AddTask } from "./AddTask";
import "./Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState<Array<ITask>>([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const { get } = useRequest();

  const listTasks = useCallback(() => {
    get("/task", { searchKeyWord })
      .then((tasks: Array<ITask>) => {
        setTasks(tasks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [get, searchKeyWord]);

  useEffect(() => {
    listTasks();
  }, [listTasks]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchKeyWord(e.target.value);
  }

  return (
    <div className="Dashboard">
      <h2>Inbox</h2>
      <input
        className="text-field SearchField"
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
      ></input>
      <TaskList refreshTaskList={listTasks} tasks={tasks}></TaskList>
      <AddTask refreshTaskList={listTasks}></AddTask>
    </div>
  );
}

export { Dashboard };
