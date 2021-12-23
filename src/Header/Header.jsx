import React from "react";
import { AppBar, Toolbar, CssBaseline, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

import theme from "../appTheme";

const useStyles = makeStyles((theme) => ({
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
  appBar: {
    bgcolor: "green",
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.primary.main }}>
      <CssBaseline />
      <Toolbar className={classes.header}>
        <Typography variant="h4">OctoPod</Typography>
        <Link to="/login" className={classes.link}>
          Logout
        </Link>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
