import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import { Typography, Stack, Link } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const useStyles = makeStyles(() => ({
  dialogPaper: {
    // minHeight: "80vh",
    maxHeight: "80vh",
  },
  margin: {
    marginRight: "20px",
  },
  formDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function InitialSetupDialog(props) {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data) {
      console.log(data);
    }
  };

  useEffect(() => {
    console.log("I got called");

    console.log(errors);
  }, [errors]);

  // console.log(errors);

  return (
    <Dialog
      open={props.isOpen}
      classes={{ paper: classes.dialogPaper }}
      maxWidth="md"
    >
      <DialogTitle variant="h5">Initial Setup: </DialogTitle>
      <DialogContent>
        <div style={{ width: "400px" }}>
          <Typography variant="body1" gutterBottom={false}>
            Please fill out the form below to add your first printer to
            PolyPrint! If you need help, please visit this{" "}
            <Link
              href="https://github.com/jbyerline/PolyPrint"
              rel="noopener noreferrer"
              target="_blank"
            >
              link
            </Link>
            .
          </Typography>
        </div>
      </DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div style={{ width: "400px" }}>
            <Stack spacing={1}>
              <div className={classes.formDiv}>
                <label>Printer Display Name</label>
                <input
                  type="text"
                  placeholder="Printer Display Name"
                  {...register("Printer Display Name", {
                    required: true,
                    maxLength: 80,
                  })}
                />
              </div>
              <div className={classes.formDiv}>
                <label>URL or IP Address</label>
                <input
                  type="url"
                  placeholder="URL or IP"
                  {...register("URL or IP", {
                    required: true,
                    pattern:
                      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/i,
                  })}
                />
              </div>
              <div className={classes.formDiv}>
                <label>Octoprint API Key</label>
                <input
                  type="text"
                  placeholder="API Key"
                  {...register("API Key", {
                    required: true,
                    pattern: /^.{32}$/i,
                  })}
                />
              </div>
              <div className={classes.formDiv}>
                <label>Has Octolight Plugin?</label>
                <select {...register("Octolight Plugin", { required: true })}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className={classes.formDiv}>
                <label>Is CNC?</label>
                <select {...register("CNC", { required: true })}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className={classes.formDiv}>
                <label>Color Code</label>
                <input
                  type="text"
                  placeholder="Color Code"
                  {...register("Color Code", {
                    pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i,
                  })}
                />
              </div>
            </Stack>
          </div>
        </DialogContent>
        <DialogActions>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              paddingRight: "15px",
              paddingBottom: "15px",
            }}
          >
            <Button onClick={props.closeDialog} variant="outlined">
              Back
            </Button>
            <Button variant="contained" type="submit">
              Add Printer
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}
