import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import RefreshIcon from "@mui/icons-material/Refresh";

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
  image: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    marginRight: "10px",
  },
}));

function HeaderLoggedIn() {
  const classes = useStyles();

  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.primary.main }}>
      <CssBaseline />
      <Toolbar className={classes.header}>
        <div className={classes.header}>
          <div className={classes.image}>
            <img
              src="/Logo_White_100x100.png"
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
        <div>
          <Tooltip
            title="Refresh"
            style={{ marginRight: "10px", marginBottom: "5px" }}
          >
            <IconButton>
              <RefreshIcon aria-label="refresh" style={{ fill: "white" }} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Settings"
            style={{ marginRight: "10px", marginBottom: "5px" }}
          >
            <IconButton>
              <SettingsIcon aria-label="settings" style={{ fill: "white" }} />
            </IconButton>
          </Tooltip>
          <Link
            to="/login"
            onClick={() => localStorage.clear()}
            className={classes.link}
          >
            Logout
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderLoggedIn;
