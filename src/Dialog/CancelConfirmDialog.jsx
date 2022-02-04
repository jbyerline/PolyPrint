import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const CancelConfirmDialog = (props) => {
  const { title, head, open, setOpen, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>
        <strong>{head}</strong>
      </DialogContent>
      <DialogContent>
        Once cancelled, your printer will continue to print until the current
        line of GCODE has finished executing.
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CancelConfirmDialog;
