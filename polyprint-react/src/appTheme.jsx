import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#548CA8",
      main: "#476072",
      dark: "#334257",
      contrastText: "#EEEEEE",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    success: {
      main: "#1c912d",
      contrastText: "#F2F2F3",
    },
    warning: {
      main: "#E8A530",
      contrastText: "#F2F2F3",
    },
    error: {
      main: "#C91D1D",
      contrastText: "#F2F2F3",
    },
  },
});

export default theme;
