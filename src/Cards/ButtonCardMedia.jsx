import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

import Camera_Off from "../Icons/Camera_Off";
import Camera_On from "../Icons/Camera_On";

const ButtonCardMedia = (props) => {
  const [webcamOn, setWebcamOn] = useState(true);

  if (webcamOn === true) {
    return (
      <Card>
        <div style={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={
              props.streamUrl === "/webcam/?action=stream"
                ? props.octoPrintLink + "/webcam/?action=stream"
                : props.streamUrl
            }
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
            <Tooltip title="Webcam Off">
              <IconButton onClick={() => setWebcamOn(false)}>
                <Camera_Off />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Card>
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
            <Tooltip title="Webcam On">
              <IconButton onClick={() => setWebcamOn(true)}>
                <Camera_On />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Card>
    );
  }
};
export default ButtonCardMedia;
