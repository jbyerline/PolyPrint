import "./App.css";
import { ThemeProvider } from "@mui/styles";

import theme from "./appTheme";
import RouterRoots from "./Router/Route";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <RouterRoots />
      </div>
    </ThemeProvider>
  );
}

export default App;
