import { createTheme } from "@mui/material/styles";

// Theme Docs:
// https://colorhunt.co/palette/edf1d69dc08b60996640513b

const greenTheme = createTheme({
  palette: {
    primary: {
      light: "#9DC08B",
      main: "#609966",
      dark: "#334257",
      contrastText: "#EDF1D6",
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

export default greenTheme;
