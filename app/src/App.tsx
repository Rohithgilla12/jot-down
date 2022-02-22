import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import { Routes } from "./Routes";

export default function App() {
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();

      console.log("You are logged in!");
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    console.log("You are not logged in!");
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      <Routes />
    </div>
  );
}
