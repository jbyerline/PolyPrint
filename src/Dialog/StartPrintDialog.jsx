import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { List, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { useCallback } from "react";

import PrintConfirmationDialog from "./PrintConfirmationDialog";

export default function StartPrintDialog(props) {
  const [isConfirmationPromptOpen, setIsConfirmationPromptOpen] =
    React.useState(false);

  const [selectedFile, setSelectedFile] = React.useState();

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

  const closeConfirmationPrompt = () => {
    setIsConfirmationPromptOpen(false);
  };

  const b2s = (t) => {
    let e = (Math.log2(t) / 10) | 0;
    return (t / 1024 ** (e = e <= 0 ? 0 : e)).toFixed(1) + "BKMGP"[e];
  };

  return (
    <Dialog open={props.isOpen} maxWidth="xl">
      <DialogTitle variant="h5" align="center">
        Select File Below to Start
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <nav>
            <List>
              {props.printerFiles ? (
                props.printerFiles[0].files.map((file) => (
                  // eslint-disable-next-line react/jsx-key
                  <div>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleClick(file)}>
                        <ListItemText
                          primary={"Name: " + file.display}
                          secondary={
                            "Uploaded: " +
                            new Date(file.date * 1000).toLocaleDateString() +
                            "    Size: " +
                            b2s(file.size)
                          }
                        />
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
        <Button onClick={props.closeDialog}>Upload</Button>
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
    </Dialog>
  );
}
