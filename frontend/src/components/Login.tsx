import { ChangeEvent, useState, FormEvent } from "react";
import "./Login.css";

import { useCurrentUser, useRequest } from "../hooks";

function Login() {
  const [username, setUsername] = useState("");
  const { setUser } = useCurrentUser();
  const { post } = useRequest();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post("/user/login", {
      username,
    })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <h2>Please login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="text-field"
          type="text"
          onChange={handleInputChange}
        ></input>
        <div className="button-container">
          <button type="submit" disabled={!username} className="button">
            Login
          </button>
        </div>
      </form>
    </>
  );
}

export { Login };
