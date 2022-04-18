import { ChangeEvent, useState, MouseEvent } from "react";
import "./Login.css";

import { useCurrentUser, useRequest } from "../hooks";

function Login() {
  const [username, setUsername] = useState("");
  const { setUser } = useCurrentUser();
  const { post } = useRequest();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleLogin(e: MouseEvent<HTMLButtonElement>) {
    post("/user/login", {
      username,
    })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
    e.preventDefault();
  }

  return (
    <>
      <h2>Please login</h2>
      <input
        className="text-field"
        type="text"
        onChange={handleInputChange}
      ></input>
      <div className="button-container">
        <button disabled={!username} className="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
}

export { Login };
