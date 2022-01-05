import React from "react";
import { AppBar, Toolbar, CssBaseline, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

import theme from "../appTheme";

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    "&:hover": {
      color: "pink",
      borderBottom: "1px solid pink",
    },
  },
}));

function HeaderLoggedOut() {
  const classes = useStyles();

  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.primary.main }}>
      <CssBaseline />
      <Toolbar className={classes.header}>
        <div>
          <Typography variant="h4">PolyPrint</Typography>
          <Typography variant="h8">for OctoPrint</Typography>
        </div>
        <Link
          to="/login"
          onClick={() => localStorage.clear()}
          className={classes.link}
        >
          Login
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderLoggedOut;
