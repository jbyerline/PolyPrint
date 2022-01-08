import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import { Typography, List, ListItem } from "@mui/material";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
  },
}));

export default function InitialSetupDialog(props) {
  const classes = useStyles();
  const [userConfig, setUserConfig] = useState();

  const handleConfigFileUpdate = () => {
    const userConfigString = JSON.stringify(userConfig);
    // const fs = require("fs");
    // fs.writeFile("myjsonfile.json", userConfigString, "utf8");
    // props.closeDialog();
  };

  return (
    <Dialog
      open={props.isOpen}
      classes={{ paper: classes.dialogPaper }}
      maxWidth="md"
    >
      <DialogTitle variant="h6">Initial Setup: </DialogTitle>
      <DialogContent>
        <Typography align="left">
          Please modify the text below to match your printers credentials. The
          entry must be in valid JSON syntax as shown below. The order in which
          you enter your printers will determine the order of appearance on the
          dashboard
        </Typography>
        <List>
          <ListItem>
            <Typography align="center">
              1. The name is whatever you wish to label the printer in this
              dashboard.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography align="center">
              2. The URL is the domain or the IP address of your printers
              octoprint instance.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography align="center">
              3. The apiKey is generated from OctoPrint inside settings -> API
              -> Global API Key
            </Typography>
          </ListItem>
          <ListItem>
            <Typography align="center">
              NOTE: While inside OctoPrint settings -> API, Please enable CORS
              as it is required to run this site.
            </Typography>
          </ListItem>
        </List>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <JSONInput
            id="a_unique_id"
            placeholder={{
              printers: [
                {
                  name: "Demo Printer",
                  URL: "https://my.octoprint.url",
                  apiKey: "F704DCD954D1417B95B9D57014D05357",
                },
                {
                  name: "Other Demo Printer",
                  URL: "192.168.1.25",
                  apiKey: "3863CCB8989C4D84957897157D964699",
                },
              ],
            }}
            locale={locale}
            height="400px"
            width="100%"
            onChange={(data) => {
              setUserConfig(data.jsObject);
            }}
          />
        </div>
        <List>
          <ListItem>
            <Typography align="left">
              Be sure there is a green checkmark in the corner of the editor.
              This means your JSON is valid
            </Typography>
          </ListItem>
          <ListItem>
            <Typography align="left">
              Once you have verified all of the above information is correct,
              click the continue button to move on.
            </Typography>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfigFileUpdate}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}
