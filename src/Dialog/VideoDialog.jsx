import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Image from "material-ui-image";
import RefreshIcon from "@mui/icons-material/Refresh";
import Container from "@mui/material/Container";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

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
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullScreen
      style={{ backgroundColor: "#13191c" }}
    >
      <DialogContent style={{ backgroundColor: "#13191c" }}>
        <Container
          sx={{ height: "96vh", display: "flex", justifyContent: "center" }}
        >
          {document.visibilityState === "visible" ? (
            <div>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: "100vw",
                  height: "97vh",
                  backgroundColor: "#13191c",
                }}
              >
                <Stack justifyContent="space-between" spacing={0.5}>
                  <div
                    style={{
                      width: "100vw",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <Image
                      src={url}
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
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: 10,
                      }}
                    >
                      <Tooltip title="Reload Stream">
                        <IconButton
                          style={{ padding: 0 }}
                          onClick={() => {
                            window.location.reload();
                          }}
                        >
                          <RefreshIcon sx={{ color: "#fff" }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div
                      style={{
                        paddingRight: 10,
                      }}
                    >
                      <Tooltip title="Exit Fullscreen" arrow={true}>
                        <IconButton
                          style={{ padding: 0 }}
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <FullscreenExitIcon sx={{ color: "#fff" }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </Stack>
              </Box>
            </div>
          ) : null}
        </Container>
      </DialogContent>
    </Dialog>
  );
};
export default VideoDialog;
