import React from "react";
import "./App.css";

import { useCurrentUser } from "./hooks";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";

function App() {
  const { user } = useCurrentUser();

  return (
    <div className="container">
      <h1 className="Header">To-Do app</h1>
      <div className="App">
        {user && <Dashboard></Dashboard>}
        {!user && <Login></Login>}
      </div>
    </div>
  );
}
export default App;
