import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function OctoprintDialog(props) {
  console.log(props.octoprintUrl);
  return (
    <Dialog fullWidth={true} maxWidth="xl" open={props.isOpen}>
      <DialogTitle>{props.printerName}</DialogTitle>
      <DialogContent>
        <iframe
          is="x-frame-bypass"
          src={props.octoprintUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ width: "100%", height: "100%" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
