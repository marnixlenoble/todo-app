import {
  ChangeEvent,
  useState,
  MouseEvent,
  useEffect,
  useCallback,
} from "react";
import { BsPlusLg } from "react-icons/bs";

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

  function handleAddTask(e: MouseEvent<HTMLButtonElement>) {
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
    <div className="input">
      <input
        className=" fake-input"
        type="text"
        placeholder="Add task..."
        value={taskTitle}
        onChange={handleInputChange}
      ></input>
      <button
        className="icon-button"
        disabled={!taskTitle}
        onClick={handleAddTask}
      >
        <BsPlusLg />
      </button>
    </div>
  );
}

export { AddTask };
