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
import LogoutIcon from "@mui/icons-material/Logout";

import theme from "../../themes/blueTheme";
import SettingsDialog from "../dialog/SettingsDialog/SettingsDialog";

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

function refreshPage() {
  window.location.reload(false);
}

function HeaderLoggedIn(props) {
  const classes = useStyles();

  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  return (
    <AppBar position="static" color="primary">
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
        <div>
          <Tooltip
            title="Refresh"
            style={{ marginRight: "10px", marginBottom: "5px" }}
          >
            <IconButton onClick={refreshPage}>
              <RefreshIcon aria-label="refresh" style={{ fill: "white" }} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Settings"
            style={{ marginRight: "10px", marginBottom: "5px" }}
          >
            <IconButton
              onClick={() => {
                setIsSettingsOpen(true);
              }}
            >
              <SettingsIcon aria-label="settings" style={{ fill: "white" }} />
            </IconButton>
          </Tooltip>
          <Link
            to="/login"
            onClick={() => localStorage.clear()}
            className={classes.link}
            style={{ borderBottom: "none" }}
          >
            <Tooltip
              title="Logout"
              style={{ marginRight: "10px", marginBottom: "5px" }}
            >
              <IconButton>
                <LogoutIcon aria-label="settings" style={{ fill: "white" }} />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </Toolbar>
      <SettingsDialog
        isOpen={isSettingsOpen}
        closeDialog={() => setIsSettingsOpen(false)}
        themeString={props.themeString}
        setThemeString={props.setThemeString}
      />
    </AppBar>
  );
}

export default HeaderLoggedIn;
