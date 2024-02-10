import React, { useEffect, useRef } from "react";
import { List } from "@mui/material";
import Button from "@mui/material/Button";
import ky from "ky";

import { makeApiUrl } from "../../../../utils/utils";

import Setting from "./Setting";

export default function SystemSettings() {
  const [uploadedFile, setUploadedFile] = React.useState("");
  const [triggerReset, setTriggerReset] = React.useState(false);
  const [triggerDownload, setTriggerDownload] = React.useState(false);

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
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const download = () => {
      ky.get(API_URL + "config")
        .then((resp) => {
          if (resp.status === 200) {
            resp.json().then((data) => {
              saveTemplateAsFile("config.json", data);
            });
          } else {
            alert("Download Error");
          }
        })
        .catch(() => {
          alert("Download Error");
        });
    };
    download();
  }, [triggerDownload]);

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

  const saveTemplateAsFile = (filename, dataObjToWrite) => {
    const blob = new Blob([JSON.stringify(dataObjToWrite, null, 2)], {
      type: "text/json",
    });
    const link = document.createElement("a");

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(
      ":"
    );

    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove();
  };

  return (
    <List>
      <Setting
        title="Export current config.json"
        description="Use this feature to download a backup of your current JSON file."
        actionComponent={
          <Button
            variant="contained"
            color="success"
            component="label"
            onClick={() => {
              setTriggerDownload(!triggerDownload);
            }}
          >
            Download
          </Button>
        }
      />
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
