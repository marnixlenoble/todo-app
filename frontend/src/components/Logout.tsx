import { BiLogOut } from "react-icons/bi";

import "./Logout.css";
import { useCurrentUser } from "../hooks";

export function Logout() {
  const { setUser } = useCurrentUser();

  function handleLogOut() {
    setUser(undefined);
  }

  return (
    <div className="logout-button-container">
      <button className="button" onClick={handleLogOut}>
        <BiLogOut className="icon" />
        <span className="logout-text">Logout</span>
      </button>
    </div>
  );
}
