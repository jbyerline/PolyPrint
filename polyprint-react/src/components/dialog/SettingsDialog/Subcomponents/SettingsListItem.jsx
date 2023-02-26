import React from "react";
import { ListItem, ListItemButton, Tooltip } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function SettingsListItem(props) {
  const { open, label, icon, settingComponent, setSettingsComponent } = props;

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <Tooltip title={label} placement="right" arrow={true}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={() => {
            setSettingsComponent(settingComponent);
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}
