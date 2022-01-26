import React, { useEffect } from "react";
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
  const [dialogText, setDialogText] = React.useState(null);

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
    setDialogText({
      title: "Shutdown System?",
      message: (
        <div>
          <p>
            <strong>You are about to shutdown the system.</strong>
          </p>
          <p>
            This action may disrupt any ongoing print jobs (depending on your
            printer's controller and general setup that might also apply to
            prints run directly from your printer's internal storage).
          </p>
        </div>
      ),
    });
    setConfirmOpen(true);
    //callSystemApi("shutdown");
    handleClose();
  };

  const handleReboot = () => {
    setDialogText({
      title: "Reboot System?",
      message: (
        <div>
          <p>
            <strong>You are about to reboot the system.</strong>
          </p>
          <p>
            This action may disrupt any ongoing print jobs (depending on your
            printer's controller and general setup that might also apply to
            prints run directly from your printer's internal storage).
          </p>
        </div>
      ),
    });
    setConfirmOpen(true);
    //callSystemApi("reboot");
    handleClose();
  };

  const handleOctoPrintRestart = () => {
    setDialogText({
      title: "Restart OctoPrint Server?",
      message: (
        <div>
          <p>
            <strong>You are about to restart the OctoPrint server.</strong>
          </p>
          <p>
            This action may disrupt any ongoing print jobs (depending on your
            printer's controller and general setup that might also apply to
            prints run directly from your printer's internal storage).
          </p>
        </div>
      ),
    });
    setConfirmOpen(true);
    //callSystemApi("restart");
    handleClose();
  };

  const handleOctoPrintSafeMode = () => {
    setDialogText({
      title: "Restart OctoPrint Server in safe mode?",
      message: (
        <div>
          <p>
            <strong>
              You are about to restart the OctoPrint server in safe mode.
            </strong>
          </p>
          <p>
            This action may disrupt any ongoing print jobs (depending on your
            printer's controller and general setup that might also apply to
            prints run directly from your printer's internal storage).
          </p>
        </div>
      ),
    });
    setConfirmOpen(true);
    //callSystemApi("restart_safe");
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
        title={dialogText.title}
        children={dialogText.message}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => {
          console.log("Confirmed");
        }}
      />
    </div>
  );
};

export default PowerMenu;
