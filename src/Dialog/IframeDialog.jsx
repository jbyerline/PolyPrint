import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function IframeDialog(props) {
  function updateIframePolicy() {
    props.datastore.updateIFramePolicy(props.octoprintUrl, props.apiKey);
    props.datastore.restartOctoprint(props.octoprintUrl, props.apiKey);
    props.closeDialog();
    props.triggerRefresh();
  }

  return (
    <Dialog open={props.isOpen}>
      <DialogTitle>Changes Needed to Continue: </DialogTitle>
      <DialogContent>
        OctoPrint cannot be loaded within this window until the allowFraming
        attribute is set to true in the OctoPrint settings. I can apply these
        changes for you but it will automatically restart OctoPrint when
        applied. Click Continue below to apply these changes or hit Cancel to go
        back.{" "}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialog}>Cancel</Button>
        <Button onClick={updateIframePolicy}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}
