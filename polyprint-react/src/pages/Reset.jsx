import * as React from "react";
import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import ky from "ky";
import { Link } from "react-router-dom";

import HeaderLoggedOut from "../components/header/HeaderLoggedOut";
import { makeApiUrl } from "../utils/utils";

export default function Reset() {
  const [uploadedFile, setUploadedFile] = React.useState("");
  const [triggerReset, setTriggerReset] = React.useState(false);

  const API_URL = makeApiUrl();

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
    e.target.value = "";
  };

  return (
    <div style={{ width: "100%" }}>
      <Stack spacing={4}>
        <HeaderLoggedOut reset={true} />
        <Typography variant="h2">Uh Oh!</Typography>
        <Typography variant="text1">
          It looks like one of us messed up something!
        </Typography>
        <Typography variant="text1">You have 2 options from here...</Typography>
        <Typography variant="text1">
          #1 Click the Restore button below and upload your fixed JSON config
          file.
        </Typography>
        <Typography variant="text1">
          #2 Click the button below to Reset your PolyPrint config back to its
          initial state.
        </Typography>
        <Typography variant="text1">
          You will see an alert pop up if the config file was updated.
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained" color="warning" component="label">
            Restore Config
            <input
              onChange={handleFileUpload}
              type="file"
              accept=".json"
              hidden
            />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setTriggerReset(true)}
          >
            Reset Config
          </Button>
        </Stack>
        <Typography variant="text1">
          Once you think your config is fixed, use the below button to redirect
          back home.
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained" component={Link} to="/">
            Head Home
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
