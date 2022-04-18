import {
  ChangeEvent,
  useState,
  useEffect,
  useCallback,
  FormEvent,
} from "react";
import { BsPlusLg } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";

import "./AddTask.css";
import { useRequest } from "../hooks";

function AddTask({ refreshTaskList }: { refreshTaskList: () => void }) {
  const [taskTitle, setTaskTitle] = useState("");
  const { post, get } = useRequest();

  const handleGetTaskName = useCallback(() => {
    get("/task/random-name")
      .then(({ randomName }: { randomName: string }) => {
        setTaskTitle(randomName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [get]);

  useEffect(() => {
    handleGetTaskName();
  }, [handleGetTaskName]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value);
  }

  function handleAddTask(e: FormEvent<HTMLFormElement>) {
    post("/task/create", {
      title: taskTitle,
    })
      .then(() => {
        refreshTaskList();
        handleGetTaskName();
      })
      .catch((error) => {
        console.log(error);
      });
    e.preventDefault();
  }

  return (
    <form onSubmit={handleAddTask} className="input">
      <input
        className=" fake-input"
        type="text"
        placeholder="Add task..."
        value={taskTitle}
        onChange={handleInputChange}
      ></input>
      <button className="icon-button" onClick={handleGetTaskName} type="button">
        <FiRefreshCcw />
      </button>
      <button className="icon-button" disabled={!taskTitle} type="submit">
        <BsPlusLg />
      </button>
    </form>
  );
}

export { AddTask };
