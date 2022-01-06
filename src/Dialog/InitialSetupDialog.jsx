import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function InitialSetupDialog(props) {
  return (
    <Dialog open={props.isOpen}>
      <DialogTitle>Initial Setup: </DialogTitle>
      <DialogContent>
        Continue through these prompts to set up ProxyPrint
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialog}>Cancel</Button>
        <Button onClick={props.closeDialog}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}
