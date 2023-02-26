import React from "react";
import { List } from "@mui/material";
import Button from "@mui/material/Button";

import Setting from "./Setting";

export default function SystemSettings(props) {
  return (
    <List>
      <Setting
        title="Restore from Backup"
        description="Use this feature to restore your PolyPrint config from a backup JSON file."
        actionComponent={
          <Button variant="contained" color="warning">
            Restore
          </Button>
        }
      />
      <Setting
        title="Reset"
        description="Use this feature to reset PolyPrint back to it's initial config."
        actionComponent={
          <Button variant="contained" color="error">
            Reset
          </Button>
        }
      />
    </List>
  );
}
