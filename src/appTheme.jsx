import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#b53f3f",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    status: {
      successGreen: "#32996D",
      warningOrange: "#E8590D",
      errorRed: "#BA3C46",
    },
  },
});

export default theme;
