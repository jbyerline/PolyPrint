import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function WelcomeDialog(props) {
  return (
    <Dialog open={props.isOpen} maxWidth="xl">
      <DialogTitle variant="h4">Initial Setup: </DialogTitle>
      <DialogContent>
        <Typography variant="h5" align="center">
          Welcome to ProxyPrint
        </Typography>
        <Typography align="center">
          <img
            src="/Logo_Black_192x192.png"
            alt="logo"
            width="100"
            height="100"
          />
        </Typography>
        <Typography align="center">
          A 3D printing dashboard for monitoring and controlling your printer
          collection.
        </Typography>
        <Typography align="center">
          Created and maintained by Jacob Byerline
        </Typography>
      </DialogContent>
      <DialogContent>
        <Typography align="center">
          Please continue through the following prompts to set up ProxyPrint
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.openSetupDialog}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}
