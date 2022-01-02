import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
  },
}));

export default function OctoprintDialog(props) {
  const classes = useStyles();
  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      fullWidth={true}
      maxWidth="xl"
      open={props.isOpen}
    >
      <DialogTitle>{props.printerName}</DialogTitle>
      <DialogContent>
        <iframe
          style={{
            width: "100%",
            height: "100vh",
          }}
          id="test"
          is="x-frame-bypass"
          src={props.octoprintUrl}
          width="100%"
          height="100vh"
          frameBorder="0"
          allowFullScreen
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
