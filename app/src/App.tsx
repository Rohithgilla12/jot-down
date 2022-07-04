import "./App.css";

import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import { Routes } from "./Routes";
import { authenticatedAtom } from "./state/authState";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function App() {
  const [_, setAuthenticated] = useAtom(authenticatedAtom);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    console.log("On Load");
    try {
      const user = await Auth.currentSession();
      console.log(user);
      setAuthenticated(true);

      console.log("You are logged in!");
    } catch (e) {
      console.error(e);
      if (e !== "No current user") {
        alert(e);
      }
    }
    setAuthenticated(false);
  }

  return (
    <div>
      <Navigation />

      <Routes />
    </div>
  );
}
