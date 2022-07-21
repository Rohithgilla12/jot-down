import "./App.css";

import { isAuthenticated, setAuthenticated } from "./state/authSlice";
import { useAppDispatch, useAppSelector } from "./state/store";

import { Auth } from "aws-amplify";
import Navigation from "./components/Navigation";
import { Routes } from "./Routes";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function App() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  // Find a better way to watch for changes
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const user = await Auth.currentSession();
      console.log(user);
      dispatch(setAuthenticated(true));
      history.push("/");
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
