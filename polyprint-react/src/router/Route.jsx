import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import HeaderLoggedIn from "../components/header/HeaderLoggedIn";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import HeaderLoggedOut from "../components/header/HeaderLoggedOut";
import Footer from "../components/footer/Footer";
import Help from "../pages/Help";

export default function RoutingRoots(props) {
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
                VerifyIsLoggedIn() ? (
                  <HomePage
                    themeString={props.themeString}
                    setThemeString={props.setThemeString}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function HomePage(props) {
  return (
    <div>
      <HeaderLoggedIn
        themeString={props.themeString}
        setThemeString={props.setThemeString}
      />
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
  return !!(localStorage.getItem("name") && localStorage.getItem("session"));
}
