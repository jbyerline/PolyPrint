import React from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Tooltip } from "@mui/material";

const PowerMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const MyOptions = [
    "Shutdown system",
    "Reboot system",
    "Restart OctoPrint",
    "Restart OctoPrint in safe mode",
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Printer Actions">
        <IconButton
          aria-label="more"
          onClick={handleClick}
          aria-haspopup="true"
          aria-controls="long-menu"
        >
          <PowerSettingsNewIcon />
          <ArrowDropDownIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} keepMounted onClose={handleClose} open={open}>
        {MyOptions.map((option) => (
          <MenuItem key={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default PowerMenu;
