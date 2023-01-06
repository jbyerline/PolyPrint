import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import HeaderLoggedIn from "../Header/HeaderLoggedIn";
import SignIn from "../Pages/SignIn";
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
      <div style={{ paddingBottom: 50 }}>
        <Home />
      </div>
      <Footer />
    </div>
  );
}

function Login() {
  return (
    <div>
      <HeaderLoggedOut />
      <div style={{ paddingBottom: 100 }}>
        <SignIn />
      </div>
      <Footer />
    </div>
  );
}

function HelpPage() {
  return (
    <div>
      <HeaderLoggedOut />
      <div style={{ paddingBottom: 50 }}>
        <Help />
      </div>
      <Footer />
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
