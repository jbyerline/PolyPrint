import React from "react";
import Typography from "@mui/material/Typography";
import { ListItem, Stack } from "@mui/material";

export default function Setting(props) {
  const { title, description, actionComponent } = props;

  return (
    <ListItem>
      <div
        style={{
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle2">{description}</Typography>
          </Stack>
          {actionComponent}
        </Stack>
      </div>
    </ListItem>
  );
}
