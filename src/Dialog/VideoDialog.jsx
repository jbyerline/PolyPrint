import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CardMedia from "@mui/material/CardMedia";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";

import CompressIcon from "../Icons/CompressIcon";

const useStyles = makeStyles(() => ({
  circleIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "50px",
    backgroundColor: "#ffffff7f",
    borderRadius: "50px",
  },
}));

const VideoDialog = (props) => {
  const classes = useStyles();

  const { url, open, setOpen } = props;
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
      <DialogContent>
        <div style={{ position: "relative" }}>
          <CardMedia component="img" image={url} alt="Printer" />
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: window.innerWidth - 80,
              transform: "translateX(-50%)",
            }}
          >
            <Tooltip title="Exit Fullscreen">
              <IconButton onClick={() => setOpen(false)}>
                <div className={classes.circleIcon}>
                  <CompressIcon fill="black" height={25} width={25} />
                </div>
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default VideoDialog;
