import React from "react";
import Avatar from "@mui/material/Avatar";

export default function CardAvatar(props) {
  const { configColor, configName, generalInfo } = props;

  return (
    <Avatar
      sx={{
        bgcolor: configColor ? configColor : generalInfo().appearance.color,
      }}
      aria-label={configName ? configName : generalInfo().appearance.name}
    >
      {configName
        ? configName.charAt(0)
        : generalInfo().appearance.name.charAt(0)}
    </Avatar>
  );
}
