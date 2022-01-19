import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

export default function GCodeDialog(props) {
  const sendGcode = () => {
    // props.datastore.startPrint(
    //   props.octoprintUrl,
    //   props.apiKey,
    //   props.selectedFile.origin,
    //   props.selectedFile.path
    // );
    props.closeDialog();
  };

  return (
    <div>
      <Dialog open={props.isOpen}>
        <DialogTitle>GCode Terminal</DialogTitle>
        <DialogContent>
          <TextField multiline rows={7} sx={{ width: 500 }} />
          <DialogContentText>
            Hint: You can enter multiple commands separated by "," or newline
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.closeDialog}>
            Close
          </Button>
          <Button onClick={sendGcode} autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
