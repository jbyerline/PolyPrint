import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../Header/Header";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";

export default function RoutingRoots() {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/new-account">
              <CreateAccount />
            </Route>
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
