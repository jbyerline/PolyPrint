import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UploadConfirmationDialog(props) {
  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle>Just Upload or Start Print?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to print{" "}
            {props.selectedFile ? props.selectedFile.name : ""} or just upload
            it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.close}>
            Cancel
          </Button>
          <Button onClick={props.justUpload} autoFocus>
            Upload
          </Button>
          <Button onClick={props.uploadAndPrint} autoFocus>
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
