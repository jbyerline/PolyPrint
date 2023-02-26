import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

export default function GCodeDialog(props) {
  const [textCommands, setTextCommands] = React.useState("");

  const sendGcode = () => {
    let commands = textCommands.toUpperCase().split(/[\n,]/);
    props.datastore.sendGcode(props.octoprintUrl, props.apiKey, commands);
    props.closeDialog();
  };

  return (
    <div>
      <Dialog open={props.isOpen}>
        <DialogTitle>GCode Terminal</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            fullWidth
            onChange={(text) => setTextCommands(text.target.value)}
          />
          <DialogContentText>
            <strong>Hint:</strong> You can enter multiple commands separated by
            "," or newline
          </DialogContentText>
          <DialogContentText>
            <strong>Note:</strong> This prompt does not return any data, it only
            issues commands. For example, "M851" will execute but do no good
            because the command just responds with printer data. But, "G28" will
            work just fine because it triggers an action.
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
