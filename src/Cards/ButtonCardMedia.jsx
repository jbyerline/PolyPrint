import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CameraOffIcon from "../Icons/CameraOffIcon";
import CameraOnIcon from "../Icons/CameraOnIcon";
import ExpandIcon from "../Icons/ExpandIcon";
import VideoDialog from "../Dialog/VideoDialog";

const useStyles = makeStyles(() => ({
  circleIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    backgroundColor: "#ffffff7f",
    borderRadius: "40px",
  },
}));

const ButtonCardMedia = (props) => {
  const classes = useStyles();

  const [webcamOn, setWebcamOn] = useState(true);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);

  const streamLink =
    props.streamUrl === "/webcam/?action=stream"
      ? props.octoPrintLink + "/webcam/?action=stream"
      : props.streamUrl;

  if (webcamOn === true) {
    return (
      <div>
        <Card>
          <div style={{ position: "relative" }}>
            <CardMedia component="img" image={streamLink} alt="Printer" />
            <div
              style={{
                position: "absolute",
                top: 10,
                left: "90%",
                transform: "translateX(-50%)",
              }}
            >
              <Tooltip title="Video Off">
                <IconButton onClick={() => setWebcamOn(false)}>
                  <div className={classes.circleIcon}>
                    <CameraOffIcon fill="black" height={25} width={25} />
                  </div>
                </IconButton>
              </Tooltip>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: "90%",
                transform: "translateX(-50%)",
              }}
            >
              <Tooltip title="Fullscreen">
                <IconButton onClick={() => setOpenVideoDialog(true)}>
                  <div className={classes.circleIcon}>
                    <ExpandIcon fill="black" height={25} width={25} />
                  </div>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </Card>
        <VideoDialog
          open={openVideoDialog}
          setOpen={setOpenVideoDialog}
          url={streamLink}
        />
      </div>
    );
  } else {
    return (
      <Card>
        <div style={{ position: "relative" }}>
          <CardMedia
            height="198"
            width="352"
            component="img"
            image="./printer_16x9.png"
            alt="Printer"
          />
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "90%",
              transform: "translateX(-50%)",
            }}
          >
            <Tooltip title="Video On">
              <IconButton onClick={() => setWebcamOn(true)}>
                <div className={classes.circleIcon}>
                  <CameraOnIcon fill="black" height={25} width={25} />
                </div>
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Card>
    );
  }
};
export default ButtonCardMedia;
