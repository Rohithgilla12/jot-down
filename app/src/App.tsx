import { Auth } from "aws-amplify";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import { Routes } from "./Routes";
import { authenticatedAtom } from "./state/authState";

export default function App() {
  const [_, setAuthenticated] = useAtom(authenticatedAtom);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      setAuthenticated(true);

      console.log("You are logged in!");
    } catch (e) {
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
