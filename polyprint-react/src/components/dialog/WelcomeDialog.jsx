import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import ky from "ky";

export default function WelcomeDialog(props) {
  const [uploadedFile, setUploadedFile] = React.useState("");

  const API_URL =
    process.env.REACT_APP_API_HOST + ":" + process.env.REACT_APP_API_PORT + "/";

  // TODO: Update alerts to be pretty toast alerts
  useEffect(() => {
    if (uploadedFile !== "") {
      const restore = () => {
        ky.post(API_URL + "restore", {
          json: JSON.parse(uploadedFile),
        })
          .then((resp) => {
            if (resp.status === 200) {
              alert("Restore Success");
              window.location.reload();
            } else {
              alert("Restore Error");
            }
            setUploadedFile("");
          })
          .catch(() => {
            alert("Restore Error");
            setUploadedFile("");
          });
      };
      restore();
    }
  }, [uploadedFile]);
  const handleFileUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setUploadedFile(e.target.result);
    };
    e.target.value = "";
  };

  return (
    <Dialog open={props.isOpen} maxWidth="xl">
      <DialogTitle variant="h4">Initial Setup: </DialogTitle>
      <DialogContent>
        <Typography variant="h5" align="center">
          Welcome to PolyPrint
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
          Please continue through the following prompts to set up PolyPrint
        </Typography>
      </DialogContent>
      <DialogActions>
        <div style={{ width: "100%", paddingBottom: "20px" }}>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Button variant="contained" color="warning" component="label">
              Restore from Backup
              <input
                onChange={handleFileUpload}
                type="file"
                accept=".json"
                hidden
              />
            </Button>
            <Button variant="contained" onClick={props.openSetupDialog}>
              Continue with setup
            </Button>
          </Stack>
        </div>
      </DialogActions>
    </Dialog>
  );
}
