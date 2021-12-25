import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import HeaderLoggedIn from "../Header/HeaderLoggedIn";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import HeaderLoggedOut from "../Header/HeaderLoggedOut";
import Footer from "../Footer/Footer";
import Help from "../Pages/Help";

let isLoggedIn = false;

export default function RoutingRoots() {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/help">
              <HelpPage />
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
      <HeaderLoggedIn />
      <Home />
      <Footer sx={{ mt: 8, mb: 4 }} />
    </div>
  );
}

function Login() {
  return (
    <div>
      <HeaderLoggedOut />
      <SignIn />
      <Footer sx={{ mt: 8, mb: 4 }} />
    </div>
  );
}

function HelpPage() {
  return (
    <div>
      <HeaderLoggedOut />
      <Help />
      <Footer sx={{ mt: 8, mb: 4 }} />
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
