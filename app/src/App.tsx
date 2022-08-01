import "./App.css";

import { isAuthenticated, setAuthenticated, setUid } from "./state/authSlice";
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
      await Auth.currentSession();
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      // dispatch(setUid(user.getIdToken().))
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
