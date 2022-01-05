import "./App.css";
import { ThemeProvider } from "@mui/styles";
import { HelmetProvider } from "react-helmet-async";

import theme from "./appTheme";
import RouterRoots from "./Router/Route";
import MetaHelmet from "./Helmet/MetaHelmet";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <MetaHelmet />
          <RouterRoots />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
