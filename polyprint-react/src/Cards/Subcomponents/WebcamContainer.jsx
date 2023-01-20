import React, { useState } from "react";
import Container from "@mui/material/Container";
import Image from "material-ui-image";
import Box from "@mui/material/Box";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, Stack, Tooltip } from "@mui/material";

import VideoDialog from "../../Dialog/VideoDialog";

export default function WebcamContainer(props) {
  const { webcamEnabled, streamUrl, isMobile } = props;
  const [open, setOpen] = useState(false);

  if (webcamEnabled) {
    return (
      <Container
        sx={{ height: "240px", display: "flex", justifyContent: "center" }}
      >
        {document.visibilityState === "visible" ? (
          <div>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: 350,
                height: 230,
                backgroundColor: "#13191c",
                borderRadius: "4px",
              }}
            >
              <Stack justifyContent="space-between" spacing={0.5}>
                <div
                  style={{
                    width: 340,
                  }}
                >
                  <Image
                    src={streamUrl}
                    // disableSpinner={isMobile}
                    // disableTransition={!isMobile}
                    aspectRatio={16 / 9}
                    onError={() => {
                      console.log("Loading image error");
                    }}
                    onLoad={() => {
                      console.log("Loading image success");
                    }}
                    onClick={() => {
                      console.log("Loading image click");
                    }}
                    imageStyle={{
                      borderRadius: "4px",
                    }}
                    style={{
                      backgroundColor: "#13191c",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Reload Stream" arrow={true}>
                    <IconButton
                      style={{ padding: 0 }}
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      <RefreshIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Fullscreen" arrow={true}>
                    <IconButton
                      style={{ padding: 0 }}
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      <FullscreenIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  </Tooltip>
                </div>
              </Stack>
            </Box>
          </div>
        ) : null}
        <VideoDialog
          url={streamUrl}
          open={open}
          setOpen={setOpen}
          isMobile={isMobile}
        />
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
