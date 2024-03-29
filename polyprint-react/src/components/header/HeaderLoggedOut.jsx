import React from "react";
import { AppBar, Toolbar, CssBaseline, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

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
  image: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    marginRight: "10px",
  },
}));

function HeaderLoggedOut(props) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar className={classes.header}>
        <div className={classes.header}>
          <div className={classes.image}>
            <img
              src="/Logo_White_192x192.png"
              alt="logo"
              width="50"
              height="50"
            />
          </div>
          <div>
            <div>
              <Typography variant="h4">PolyPrint</Typography>
              <Typography variant="h8">for OctoPrint</Typography>
            </div>
          </div>
        </div>
        {!props.reset ? (
          <Link
            to="/login"
            onClick={() => localStorage.clear()}
            className={classes.link}
          >
            Login
          </Link>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

export default HeaderLoggedOut;
