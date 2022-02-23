import { Route, Switch } from "react-router";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/sign_up">
        <SignUp />
      </Route>
      <Route path="/sign_in">
        <SignIn />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

function Home() {
  return <h2>Home</h2>;
}
