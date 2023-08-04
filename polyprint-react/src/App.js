import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { HelmetProvider } from "react-helmet-async";
import React, { useEffect } from "react";

import redTheme from "./themes/redTheme";
import greenTheme from "./themes/greenTheme";
import blueTheme from "./themes/blueTheme";
import RouterRoutes from "./router/Route";
import MetaHelmet from "./components/helmet/MetaHelmet";

function App() {
  const [theme, setTheme] = React.useState(blueTheme);
  const [themeString, setThemeString] = React.useState("Blue");
  useEffect(() => {
    if (themeString === "Red") {
      setTheme(redTheme);
    } else if (themeString === "Green") {
      setTheme(greenTheme);
    } else if (themeString === "Blue") {
      setTheme(blueTheme);
    } else {
      console.error("Invalid theme choice: " + JSON.stringify(themeString));
    }
  }, [themeString]);
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <MetaHelmet />
          <RouterRoutes
            themeString={themeString}
            setThemeString={setThemeString}
          />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
