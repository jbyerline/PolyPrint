import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import { Typography, List, ListItem, AlertTitle, Alert } from "@mui/material";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
  },
  margin: {
    marginRight: "20px",
  },
}));

export default function InitialSetupDialog(props) {
  const classes = useStyles();

  const configPlaceholder = {
    credentials: {
      username: "admin",
      password: "password",
    },
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
        octoLight: true,
      },
    ],
  };

  const [userConfig, setUserConfig] = useState(
    JSON.stringify(configPlaceholder)
  );

  const handleConfigCopy = () => {
    navigator.clipboard.writeText(userConfig);
  };

  return (
    <Dialog
      open={props.isOpen}
      classes={{ paper: classes.dialogPaper }}
      maxWidth="md"
    >
      <DialogTitle variant="h5">Initial Setup: </DialogTitle>
      <DialogContent>
        <Typography align="left">
          Please modify the text below to match your printers credentials. The
          entry must be in valid JSON syntax as shown below. The order in which
          you enter your printers will determine the order of appearance on the
          dashboard
        </Typography>
        <List>
          <ListItem>
            <Typography align="left">
              1. The username is whatever you want your username to be.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography align="left">
              2. The password is whatever you want your password to be.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography align="left">
              3. The name is whatever you wish to label the printer in this
              dashboard.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography align="left">
              4. The URL is the domain or the IP address of your printers
              octoprint instance.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography align="left">
              5. The apiKey is generated from OctoPrint inside settings --> API
              --> Global API Key
            </Typography>
          </ListItem>
          <ListItem>
            <Typography align="left">
              NOTE: While inside OctoPrint settings -> API, Please enable CORS
              as it is required to run this site.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography align="left">
              6. [Optional] The octoLight field is for the OctoLight plugin for
              OctoPi and must be installed for this functionality. It allows you
              to toggle a light attached to your Raspberry Pi's GPIO.
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
            placeholder={configPlaceholder}
            locale={locale}
            height="400px"
            width="100%"
            onChange={(data) => {
              setUserConfig(data.json);
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
              copy the text USING THE BUTTON BELOW! The JSON must be
              "stringified" in order to be parsed properly.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography align="left">
              Then paste it into your PrinterConfig.json file located in the
              root of the project directory. Once you save that file and refresh
              you should be at the PolyPrint home screen!
            </Typography>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Alert severity="error" className={classes.margin}>
          <strong>Use this button to copy json --> </strong>
        </Alert>
        <Button onClick={handleConfigCopy} variant="contained">
          Copy Stringified JSON
        </Button>
      </DialogActions>
    </Dialog>
  );
}
