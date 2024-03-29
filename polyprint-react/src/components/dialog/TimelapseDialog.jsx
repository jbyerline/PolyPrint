import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { List, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { useCallback } from "react";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import theme from "../../themes/blueTheme";
import TickerByLength from "../ticker/TickerByLength";

import TimelapseConfirmationDialog from "./TimelapseConfirmationDialog";

const useStyles = makeStyles(() => ({
  indexNumbers: {
    marginRight: "10px",
  },
}));

export default function TimelapseDialog(props) {
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [isConfirmationPromptOpen, setIsConfirmationPromptOpen] =
    React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState();

  const handleClick = useCallback(
    (file) => () => {
      setSelectedFile({
        name: file.name,
        path: file.url,
      });
      setIsConfirmationPromptOpen(true);
    },
    []
  );

  const closeConfirmationPrompt = () => {
    setIsConfirmationPromptOpen(false);
  };

  const b2s = (t) => {
    let e = (Math.log2(t) / 10) | 0;
    return (t / 1024 ** (e = e <= 0 ? 0 : e)).toFixed(1) + "BKMGP"[e];
  };

  // Reverse Sort Files based on Date Uploaded
  const fileArray =
    props.timelapseData() && props.timelapseData() !== "N/A"
      ? props
          .timelapseData()
          .files.sort(function (a, b) {
            return Date.parse(a.date) - Date.parse(b.date);
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

  const formatTitle = (text) => {
    if (text) {
      return text.replace(/_[0-9]+\.mp4|_[0-9]+-fail\.mp4/, ".mp4");
    } else {
      return "N/A";
    }
  };

  return (
    <Dialog
      open={props.isOpen}
      fullWidth={true}
      maxWidth="sm"
      fullScreen={fullScreen}
    >
      {fileArray !== "N/A" && fileArray.length > 0 ? (
        <DialogTitle variant="h5" align="center">
          Select Timelapse File Below
        </DialogTitle>
      ) : (
        <DialogTitle variant="h5" align="center">
          No Timelapse Files Found
        </DialogTitle>
      )}
      <DialogContent>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <nav>
            <List>
              {fileArray !== "N/A" && fileArray.length > 0 ? (
                fileArray.map((file, index) => (
                  <div key={file.name}>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleClick(file)}>
                        <div className={classes.indexNumbers}>
                          <Typography variant="body1">
                            <strong>{twoDigitNum(index + 1)}.</strong>
                          </Typography>
                        </div>
                        <div>
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            <Typography style={{ paddingRight: "5px" }}>
                              <strong>Name:</strong>
                            </Typography>
                            <TickerByLength
                              text={formatTitle(file.name)}
                              maxLen={props.isMobile ? 30 : 44}
                              speed={3}
                              mode="await"
                              divLen={props.isMobile ? 215 : 425}
                            />
                          </div>
                          <Typography>
                            <strong>Uploaded:</strong> {file.date}{" "}
                            <strong>Size:</strong> {b2s(file.bytes)}
                          </Typography>
                        </div>
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </div>
                ))
              ) : (
                <Typography>
                  No timelapse videos were found. Please make sure timelapse is
                  enabled on OctoPrint to use this feature.
                </Typography>
              )}
            </List>
          </nav>
        </Box>
      </DialogContent>

      {fileArray !== "N/A" && fileArray.length > 0 ? (
        <DialogActions>
          <Button onClick={props.closeDialog}>Cancel</Button>
        </DialogActions>
      ) : (
        <DialogActions>
          <Button onClick={props.closeDialog}>Close</Button>
        </DialogActions>
      )}
      <TimelapseConfirmationDialog
        open={isConfirmationPromptOpen}
        close={closeConfirmationPrompt}
        closeOther={props.closeDialog}
        selectedFile={selectedFile}
        octoprintUrl={props.octoprintUrl}
        datastore={props.datastore}
        apiKey={props.apiKey}
      />
    </Dialog>
  );
}
