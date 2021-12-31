import "./App.css";
import { ThemeProvider } from "@mui/styles";

import theme from "./appTheme";
import RouterRoots from "./Router/Route";
import MetaHelmet from "./Helmet/MetaHelmet";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MetaHelmet />
        <RouterRoots />
      </div>
    </ThemeProvider>
  );
}

export default App;
