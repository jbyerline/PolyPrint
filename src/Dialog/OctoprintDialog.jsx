import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles(() => ({
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
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{props.printerName}</Box>
          <Box>
            <IconButton onClick={props.closeDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <iframe
          title="Octoprint-in-dialog"
          style={{
            width: "100%",
            height: "80vh",
          }}
          src={props.octoprintUrl}
          width="100%"
          height="80vh"
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
