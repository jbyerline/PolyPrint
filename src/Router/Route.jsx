import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Header from "../Header/Header";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";

let isLoggedIn = false;

export default function RoutingRoots() {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <SignIn />
            </Route>
            <Route path="/new-account">
              <CreateAccount />
            </Route>
            <Route
              path="/"
              render={() =>
                VerifyIsLoggedIn() ? <HomePage /> : <Redirect to="/login" />
              }
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <Header />
      <Home />
    </div>
  );
}

function Login() {
  return (
    <div>
      <Header />
      <SignIn />
    </div>
  );
}

function CreateAccount() {
  return (
    <div>
      <Header />
      <SignUp />
    </div>
  );
}

function VerifyIsLoggedIn() {
  if (localStorage.getItem("name") && localStorage.getItem("session")) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
  return isLoggedIn;
}
