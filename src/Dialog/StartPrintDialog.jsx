import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { List, ListItemText, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { useCallback } from "react";
import { makeStyles } from "@mui/styles";

import theme from "../appTheme";

import PrintConfirmationDialog from "./PrintConfirmationDialog";
import UploadConfirmationDialog from "./UploadConfirmationDialog";

const useStyles = makeStyles(() => ({
  indexNumbers: {
    marginRight: "25px",
  },
}));

export default function StartPrintDialog(props) {
  const classes = useStyles();

  const [isConfirmationPromptOpen, setIsConfirmationPromptOpen] =
    React.useState(false);
  const [isUploadPromptOpen, setIsUploadPromptOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState();
  const [uploadedFile, setUploadedFile] = React.useState();

  const handleClick = useCallback(
    (file) => () => {
      setSelectedFile({
        name: file.name,
        path: file.path,
        origin: file.origin,
      });
      setIsConfirmationPromptOpen(true);
    },
    []
  );

  const handleFileUpload = ({ target }) => {
    setUploadedFile(target.files[0]);
    setIsUploadPromptOpen(true);
  };

  const handleJustUpload = () => {
    setIsUploadPromptOpen(false);
    props.closeDialog();
    props.datastore.uploadFile(
      props.octoprintUrl,
      props.apiKey,
      uploadedFile,
      false
    );
    props.triggerRefresh();
  };

  const handleUploadAndPrint = () => {
    setIsUploadPromptOpen(false);
    props.closeDialog();
    props.datastore.uploadFile(
      props.octoprintUrl,
      props.apiKey,
      uploadedFile,
      true
    );
    props.triggerRefresh();
  };

  const closeConfirmationPrompt = () => {
    setIsConfirmationPromptOpen(false);
  };

  const closeUploadPrompt = () => {
    setIsUploadPromptOpen(false);
  };

  const b2s = (t) => {
    let e = (Math.log2(t) / 10) | 0;
    return (t / 1024 ** (e = e <= 0 ? 0 : e)).toFixed(1) + "BKMGP"[e];
  };

  // Reverse Sort Files based on Date Uploaded
  const fileArray = props.printerFiles
    ? props.printerFiles[0].files
        .sort(function (a, b) {
          return a.date - b.date;
        })
        .reverse()
    : "N/A";

  const twoDigitNum = (number) => {
    if (number < 10) {
      return "0" + number.toString();
    } else {
      return number.toString();
    }
  };

  return (
    <Dialog open={props.isOpen} fullWidth="%100" maxWidth="sm">
      <DialogTitle variant="h5" align="center">
        Select File Below to Start
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <nav>
            <List>
              {fileArray !== "N/A" ? (
                fileArray.map((file, index) => (
                  <div key={file.display}>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleClick(file)}>
                        <div className={classes.indexNumbers}>
                          <Typography variant="h6">
                            <strong>{twoDigitNum(index + 1)}.</strong>
                          </Typography>
                        </div>
                        <div
                          style={{
                            color: file.prints
                              ? file.prints.last.success === true
                                ? theme.palette.status.successGreen
                                : theme.palette.status.errorRed
                              : null,
                          }}
                        >
                          <Typography>
                            <strong>Name:</strong> {file.display}
                          </Typography>
                          <Typography>
                            <strong>Uploaded:</strong>{" "}
                            {new Date(file.date * 1000).toLocaleDateString()}{" "}
                            <strong>Size:</strong> {b2s(file.size)}
                          </Typography>
                        </div>
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </div>
                ))
              ) : (
                <p>N/A</p>
              )}
            </List>
          </nav>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.closeDialog}>Cancel</Button>
        <Button component="label">
          Upload
          <input
            onChange={handleFileUpload}
            type="file"
            accept=".stl, .gcode, .gco, .g"
            hidden
          />
        </Button>
      </DialogActions>
      <PrintConfirmationDialog
        open={isConfirmationPromptOpen}
        close={closeConfirmationPrompt}
        closeOther={props.closeDialog}
        selectedFile={selectedFile}
        octoprintUrl={props.octoprintUrl}
        datastore={props.datastore}
        apiKey={props.apiKey}
      />
      <UploadConfirmationDialog
        open={isUploadPromptOpen}
        close={closeUploadPrompt}
        closeOther={props.closeDialog}
        selectedFile={uploadedFile}
        justUpload={handleJustUpload}
        uploadAndPrint={handleUploadAndPrint}
      />
    </Dialog>
  );
}
