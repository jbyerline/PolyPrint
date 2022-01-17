import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PreheatDialog(props) {
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.closeDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Preheat Printer?</DialogTitle>
        <DialogContent>
          <DialogContentText>Set Temperature:</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.closeDialog}>
            Cancel
          </Button>
          <Button autoFocus onClick={props.closeDialog}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
