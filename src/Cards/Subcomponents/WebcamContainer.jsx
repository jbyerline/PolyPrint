import React from "react";
import Container from "@mui/material/Container";
import Image from "material-ui-image";

export default function WebcamContainer(props) {
  const { webcamEnabled, streamUrl, isMobile } = props;

  if (webcamEnabled) {
    return (
      <Container sx={{ height: "200px" }}>
        {document.visibilityState === "visible" ? (
          <Image
            src={streamUrl}
            // disableSpinner={isMobile}
            // disableTransition={!isMobile}
            aspectRatio={16 / 9}
          />
        ) : null}
      </Container>
    );
  } else {
    return (
      <Container sx={{ height: "285px" }}>
        <Image
          src="./printer_16x9.png"
          disableSpinner={true}
          aspectRatio={16 / 9}
        />
      </Container>
    );
  }
}
