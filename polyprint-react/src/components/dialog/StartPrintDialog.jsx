import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Backdrop,
  CircularProgress,
  List,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { useCallback } from "react";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogContentText from "@mui/material/DialogContentText";

import theme from "../../themes/blueTheme";
import TickerByLength from "../ticker/TickerByLength";

import PrintConfirmationDialog from "./PrintConfirmationDialog";
import UploadConfirmationDialog from "./UploadConfirmationDialog";

const useStyles = makeStyles(() => ({
  indexNumbers: {
    marginRight: "10px",
    marginLeft: "-30px",
  },
}));

export default function StartPrintDialog(props) {
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isConfirmationPromptOpen, setIsConfirmationPromptOpen] =
    React.useState(false);
  const [isUploadPromptOpen, setIsUploadPromptOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState();
  const [uploadedFile, setUploadedFile] = React.useState();
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = React.useState(false);
  const [fileToDelete, setFileToDelete] = React.useState(null);

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

  const handleJustUpload = async () => {
    setIsUploading(true);
    setIsUploadPromptOpen(false);
    try {
      await props.datastore.uploadFile(
        props.octoprintUrl,
        props.apiKey,
        uploadedFile,
        false
      );
    } catch (error) {
      console.error("Error uploading file", error);
      props.closeDialog();
    } finally {
      props.closeDialog();
      setIsUploading(false);
      props.triggerRefresh();
    }
  };

  const handleUploadAndPrint = async () => {
    setIsUploading(true);
    setIsUploadPromptOpen(false);
    try {
      await props.datastore.uploadFile(
        props.octoprintUrl,
        props.apiKey,
        uploadedFile,
        true
      );
    } catch (error) {
      console.error("Error uploading file", error);
      props.closeDialog();
    } finally {
      props.closeDialog();
      setIsUploading(false);
      props.triggerRefresh();
    }
  };

  const handleDeleteFile = async () => {
    if (!fileToDelete) return;

    setIsUploading(true);
    setIsUploadPromptOpen(false);
    try {
      await props.datastore.deleteFile(
        props.octoprintUrl,
        props.apiKey,
        fileToDelete
      );
    } catch (error) {
      console.error("Error uploading file", error);
      props.closeDialog();
    } finally {
      setIsDeletePromptOpen(false);
      setFileToDelete(null);
      props.closeDialog();
      setIsUploading(false);
      props.triggerRefresh();
    }
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

  // Reverse Sort Files numerically first based on Date Uploaded, then alphabetically by display name
  const fileArray = props.printerFiles()
    ? props
        .printerFiles()
        .files.sort(function (a, b) {
          if (a.date !== b.date) {
            return a.date - b.date;
          } else {
            return a.date;
          }
        })
        .sort(function (a, b) {
          if (a.date === b.date) {
            if (a.display >= b.display) {
              return 1;
            } else {
              return -1;
            }
          } else {
            return -1;
          }
        })
    : "N/A";

  const twoDigitNum = (number) => {
    if (number < 10) {
      return "0" + number.toString();
    } else {
      return number.toString();
    }
  };

  return (
    <Dialog
      open={props.isOpen}
      fullWidth={true}
      maxWidth="sm"
      fullScreen={fullScreen}
    >
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
                          <Typography variant="body1">
                            <strong>{twoDigitNum(index + 1)}.</strong>
                          </Typography>
                        </div>
                        <div
                          style={{
                            color: file.prints
                              ? file.prints.last.success === true
                                ? theme.palette.success.main
                                : theme.palette.error.main
                              : null,
                            width: props.isMobile ? 245 : 425,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            <Typography style={{ paddingRight: "5px" }}>
                              <strong>Name:</strong>
                            </Typography>
                            <TickerByLength
                              text={file.display}
                              maxLen={props.isMobile ? 30 : 45}
                              speed={3}
                              mode="await"
                              divLen={props.isMobile ? 245 : 425}
                            />
                          </div>
                          <Typography>
                            <strong>Uploaded:</strong>{" "}
                            {new Date(file.date * 1000).toLocaleDateString()}{" "}
                            <strong>Size:</strong> {b2s(file.size)}
                          </Typography>
                        </div>
                        <Box sx={{ ml: 3 }}>
                          <IconButton
                            onClick={(e) => {
                              console.log(file.name);
                              e.stopPropagation();
                              setFileToDelete(file.name);
                              setIsDeletePromptOpen(true);
                            }}
                            edge="end"
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
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
      <Dialog
        open={isDeletePromptOpen}
        onClose={() => setIsDeletePromptOpen(false)}
      >
        <DialogTitle>Confirm File Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeletePromptOpen(false)}>Cancel</Button>
          <Button
            onClick={() =>
              handleDeleteFile().then(() => {
                props.setAlertState({
                  isOpen: true,
                  level: "success",
                  message: "File Deleted",
                });
              })
            }
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isUploading}
      >
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // semi-transparent white
          }}
        >
          <CircularProgress style={{ color: "black" }} />
          <div
            style={{ marginTop: "20px", color: "black", fontSize: "1.25rem" }}
          >
            Uploading File...
          </div>
        </Paper>
      </Backdrop>
    </Dialog>
  );
}
