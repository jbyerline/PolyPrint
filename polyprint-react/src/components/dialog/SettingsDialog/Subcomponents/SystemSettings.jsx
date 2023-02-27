import React, { useEffect } from "react";
import { List } from "@mui/material";
import Button from "@mui/material/Button";
import ky from "ky";

import { makeApiUrl } from "../../../../utils/utils";

import Setting from "./Setting";

export default function SystemSettings(props) {
  const [uploadedFile, setUploadedFile] = React.useState("");
  const [triggerReset, setTriggerReset] = React.useState(false);

  const API_URL = makeApiUrl();

  // TODO: Update alerts to be pretty toast alerts
  useEffect(() => {
    if (uploadedFile !== "") {
      console.log(uploadedFile);
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

  // TODO: Update alerts to be pretty toast alerts
  useEffect(() => {
    if (triggerReset === true) {
      const reset = () => {
        ky.get(API_URL + "reset")
          .then((resp) => {
            if (resp.status === 200) {
              alert("Reset Success");
              window.location.reload();
            } else {
              alert("Reset Error");
            }
            setTriggerReset(false);
          })
          .catch(() => {
            alert("Reset Error");

            setTriggerReset(false);
          });
      };
      reset();
    }
  }, [triggerReset]);

  const handleFileUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setUploadedFile(e.target.result);
    };
  };

  return (
    <List>
      <Setting
        title="Restore from Backup"
        description="Use this feature to restore your PolyPrint config from a backup JSON file."
        actionComponent={
          <Button variant="contained" color="warning" component="label">
            Restore
            <input
              onChange={handleFileUpload}
              type="file"
              accept=".json"
              hidden
            />
          </Button>
        }
      />
      <Setting
        title="Reset"
        description="Use this feature to reset PolyPrint back to it's initial config."
        actionComponent={
          <Button
            variant="contained"
            color="error"
            onClick={() => setTriggerReset(true)}
          >
            Reset
          </Button>
        }
      />
    </List>
  );
}
