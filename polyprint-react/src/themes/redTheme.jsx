import { createTheme } from "@mui/material/styles";

// Theme Docs:
// https://colorhunt.co/palette/ff5c58fe8f8ffcd2d1ffedd3

const redTheme = createTheme({
  palette: {
    primary: {
      light: "#E8505B",
      main: "#CF1B1B",
      dark: "#900D0D",
      contrastText: "#F1F3DE",
    },
    // TODO: find a secondary that makes sense with this theme
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

export default redTheme;
