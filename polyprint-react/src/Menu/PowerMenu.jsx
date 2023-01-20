import React from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Tooltip } from "@mui/material";

import PowerConfirmDialog from "../Dialog/PowerConfirmDialog";

const PowerMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("N/A");
  const [dialogMessage, setDialogMessage] = React.useState("N/A");
  const [command, setCommand] = React.useState();

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const callSystemApi = (command) => {
    props.datastore.controlSystem(props.octoprintUrl, props.apiKey, command);
  };

  const handleShutdown = () => {
    setCommand("shutdown");
    setDialogTitle("Shutdown System?");
    setDialogMessage("You are about to shutdown the system.");
    setConfirmOpen(true);
    handleClose();
  };

  const handleReboot = () => {
    setCommand("reboot");
    setDialogTitle("Reboot System?");
    setDialogMessage("You are about to reboot the system.");
    setConfirmOpen(true);
    handleClose();
  };

  const handleOctoPrintRestart = () => {
    setCommand("restart");
    setDialogTitle("Restart OctoPrint Server?");
    setDialogMessage("You are about to restart the OctoPrint server.");
    setConfirmOpen(true);
    handleClose();
  };

  const handleOctoPrintSafeMode = () => {
    setCommand("restart_safe");
    setDialogTitle("Restart OctoPrint Server in safe mode?");
    setDialogMessage(
      "You are about to restart the OctoPrint server in safe mode."
    );
    setConfirmOpen(true);
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Printer Actions">
        <IconButton
          aria-label="more"
          onClick={handleIconClick}
          aria-haspopup="true"
          aria-controls="long-menu"
        >
          <PowerSettingsNewIcon />
          <ArrowDropDownIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} keepMounted onClose={handleClose} open={open}>
        <MenuItem onClick={handleShutdown}>Shutdown system</MenuItem>
        <MenuItem onClick={handleReboot}>Reboot system</MenuItem>
        <MenuItem onClick={handleOctoPrintRestart}>Restart OctoPrint</MenuItem>
        <MenuItem onClick={handleOctoPrintSafeMode}>
          Restart OctoPrint in safe mode
        </MenuItem>
      </Menu>
      <PowerConfirmDialog
        title={dialogTitle}
        head={dialogMessage}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => {
          callSystemApi(command);
        }}
      />
    </div>
  );
};

export default PowerMenu;
