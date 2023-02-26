import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PrintConfirmationDialog(props) {
  const startPrint = () => {
    props.datastore.startPrint(
      props.octoprintUrl,
      props.apiKey,
      props.selectedFile.origin,
      props.selectedFile.path
    );
    props.close();
    props.closeOther();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Start Print?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to print:{" "}
            {props.selectedFile ? props.selectedFile.name : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.close}>
            Cancel
          </Button>
          <Button onClick={startPrint} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
