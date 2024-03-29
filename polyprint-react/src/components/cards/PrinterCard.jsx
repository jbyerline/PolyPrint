import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TerminalIcon from "@mui/icons-material/Terminal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOctopusDeploy } from "@fortawesome/free-brands-svg-icons";
import { faLightbulb as lightOutlined } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsAlt,
  faLightbulb as lightSolid,
} from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import UsbIcon from "@mui/icons-material/Usb";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { UsbOff } from "@mui/icons-material";
import Image from "material-ui-image";

import OctoprintDialog from "../dialog/OctoprintDialog";
import OctoprintDataStore from "../../datastores/OctoprintDataStore";
import IframeDialog from "../dialog/IframeDialog";
import TickerByLength from "../ticker/TickerByLength";
import LinearProgressWithLabel from "../progress/LinearProgressWithLabel";
import PowerMenu from "../menu/PowerMenu";
import StartPrintDialog from "../dialog/StartPrintDialog";
import PreheatDialog from "../dialog/PreheatDialog";
import GCodeDialog from "../dialog/GCodeDialog";
import CancelConfirmDialog from "../dialog/CancelConfirmDialog";
import TimelapseDialog from "../dialog/TimelapseDialog";

import DisconnectedPrinterCard from "./DisconnectedPrinterCard";

const octoprintDataStore = new OctoprintDataStore();

const ExpandMore = styled((props) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PrinterCard = observer((props) => {
  const { octoPrintLink } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [octoPrintDialogOpen, isOctoPrintDialogOpen] = React.useState(false);
  const [iFrameDialogOpen, isIframeDialogOpen] = React.useState(false);
  const [generalDataRefresh, setGeneralDataRefresh] = React.useState(false);
  const [generalData, setGeneralData] = useState("N/A");
  const [printerState, setPrinterState] = useState();
  const [jobState, setJobState] = useState();
  const [files, setFiles] = useState();
  const [isPaused, setIsPaused] = useState(false);
  const [isStartPrintDialogOpen, setIsStartPrintDialogOpen] =
    React.useState(false);
  const [isTimelapseDialogOpen, setIsTimelapseDialogOpen] =
    React.useState(false);
  const [isGCodeDialogOpen, setIsGCodeDialogOpen] = React.useState(false);
  const [isPreheatDialogOpen, setIsPreheatDialogOpen] = React.useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false);

  const printerThemeColor =
    generalData !== "N/A" ? generalData.appearance.color : "black";
  const printerStatus = printerState ? printerState[0].state.text : "N/A";
  const bedTempActual = printerState
    ? printerState[0].temperature.bed
      ? printerState[0].temperature.bed.actual
      : "N/A"
    : "N/A";
  const bedTempTarget = printerState
    ? printerState[0].temperature.bed
      ? printerState[0].temperature.bed.target
      : "N/A"
    : "N/A";
  const nozzleTempActual = printerState
    ? printerState[0].temperature.tool0
      ? printerState[0].temperature.tool0.actual
      : "N/A"
    : "N/A";
  const nozzleTempTarget = printerState
    ? printerState[0].temperature.tool0
      ? printerState[0].temperature.tool0.target
      : "N/A"
    : "N/A";
  const currentFileName = jobState ? jobState[0].job.file.display : "N/A";
  const printCompletionPercent = jobState ? jobState[0].progress.completion : 0;
  const currentFile = files
    ? files[0].files.find(({ name }) => name === currentFileName)
    : "N/A";
  const downloadLink =
    currentFile !== "N/A" && currentFile ? currentFile.refs.download : "N/A";
  const webcamEnabled =
    generalData !== "N/A" ? generalData.webcam.webcamEnabled : false;
  const streamUrl =
    generalData !== "N/A" ? generalData.webcam.streamUrl : "N/A";

  let elapsedTime;
  if (jobState) {
    let date = new Date(null);
    date.setSeconds(jobState[0].progress.printTime);
    elapsedTime = date.toISOString().substr(11, 8);
  } else {
    elapsedTime = "N/A";
  }

  let timeRemaining;
  if (jobState) {
    let date = new Date(null);
    date.setSeconds(jobState[0].progress.printTimeLeft);
    timeRemaining = date.toISOString().substr(11, 8);
  } else {
    timeRemaining = "N/A";
  }

  const [currentPrinterState, setCurrentPrinterState] = useState("N/A");
  const [isOnline, setIsOnline] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionRefresh, setConnectionRefresh] = useState(false);
  const [lightState, setLightState] = useState(false);
  const [timelapseData, setTimelapse] = useState("N/A");
  const [isMobile] = useState(
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  );

  // Initial UseEffect to check if connection exists
  useEffect(() => {
    octoprintDataStore
      .fetchConnectionInfo(props.octoPrintLink, props.printerApiKey)
      .then((data) => {
        if (data) {
          setCurrentPrinterState(data.current.state);
          setIsOnline(true);
          if (data.current.state === "Closed") {
            setIsConnected(false);
          } else {
            setIsConnected(true);
          }
        }
      })
      .catch((err) => {
        setIsOnline(false);
        console.log("Error retrieving connection info", err);
      });
  }, [connectionRefresh]);

  // Once connection status is determined
  const fetchGeneralData = () => {
    // If we are connected, fetch general info every 10 sec
    if (isConnected) {
      octoprintDataStore
        .fetchGeneralInfo(props.octoPrintLink, props.printerApiKey)
        .then((data) => {
          if (data) {
            setGeneralData(Object.assign(...data));
          }
        })
        .catch((err) => {
          console.log("Error retrieving general printer info", err);
        });

      octoprintDataStore
        .fetchAllFiles(props.octoPrintLink, props.printerApiKey)
        .then((data) => {
          setFiles(data);
        })
        .catch((err) =>
          console.log("Error retrieving files from printer", err)
        );

      octoprintDataStore
        .fetchPrinterStatus(props.octoPrintLink, props.printerApiKey)
        .then((data) => {
          setPrinterState(data);
        })
        .catch((err) =>
          console.log("Error retrieving printer status info", err)
        );

      octoprintDataStore
        .fetchJobStatus(props.octoPrintLink, props.printerApiKey)
        .then((data) => {
          setJobState(data);
        })
        .catch((err) => console.log("Error retrieving job info", err));

      octoprintDataStore
        .fetchConnectionInfo(props.octoPrintLink, props.printerApiKey)
        .then((data) => {
          if (data) {
            setCurrentPrinterState(data.current.state);
          }
        })
        .catch((err) => {
          console.log("Error retrieving connection info", err);
        });

      octoprintDataStore
        .getTimelapses(props.octoPrintLink, props.printerApiKey)
        .then((data) => {
          if (data) {
            setTimelapse(data);
          }
        })
        .catch((err) => {
          console.log("Error retrieving timelapse info", err);
        });
      if (props.octolight === true) {
        octoprintDataStore
          .octolight(props.octoPrintLink, props.printerApiKey, "getState")
          .then((data) => {
            if (data) {
              setLightState(data.state);
            }
          })
          .catch((err) => {
            console.log("Error retrieving connection info", err);
          });
      }
    }
  };

  useEffect(() => {
    fetchGeneralData();
    const interval = setInterval(() => {
      fetchGeneralData();
    }, 4000);
    return () => clearInterval(interval);
  }, [isConnected, isOnline]);

  const handleConnect = () => {
    octoprintDataStore.modifyPrinterConnection(
      props.octoPrintLink,
      props.printerApiKey,
      "connect"
    );
    setTimeout(() => {
      setConnectionRefresh(!connectionRefresh);
    }, 2000);
  };
  const handleDisconnect = () => {
    octoprintDataStore.modifyPrinterConnection(
      props.octoPrintLink,
      props.printerApiKey,
      "disconnect"
    );

    setTimeout(() => {
      setConnectionRefresh(!connectionRefresh);
    }, 2000);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePauseIconClick = () => {
    setIsPaused(true);
    octoprintDataStore.sendJobCommand(
      props.octoPrintLink,
      props.printerApiKey,
      "pause",
      "pause"
    );
  };

  const handleResumeIconClick = () => {
    setIsPaused(false);
    octoprintDataStore.sendJobCommand(
      props.octoPrintLink,
      props.printerApiKey,
      "pause",
      "resume"
    );
  };

  const handleStartIconClick = () => {
    setIsStartPrintDialogOpen(true);
  };

  const handleStopIconClick = () => {
    setCancelDialogOpen(true);
  };

  const handleCancelPrint = () => {
    octoprintDataStore.sendJobCommand(
      props.octoPrintLink,
      props.printerApiKey,
      "cancel"
    );
  };

  const handleOctoIconClick = () => {
    if (generalData.server.allowFraming === false) {
      isIframeDialogOpen(true);
    } else {
      isOctoPrintDialogOpen(true);
    }
  };
  const handleCloseOctoPrintDialog = () => {
    isOctoPrintDialogOpen(false);
  };
  const handleCloseIframeDialog = () => {
    isIframeDialogOpen(false);
  };
  const handleCloseStartPrintDialog = () => {
    setIsStartPrintDialogOpen(false);
  };
  const handleCloseTimelapseDialog = () => {
    setIsTimelapseDialogOpen(false);
  };
  const handleGCodeIconClick = () => {
    setIsGCodeDialogOpen(true);
  };
  const handleCloseGCodeDialog = () => {
    setIsGCodeDialogOpen(false);
  };
  const handlePreheatIconClick = () => {
    setIsPreheatDialogOpen(true);
  };
  const handleTimelapseIconClick = () => {
    setIsTimelapseDialogOpen(true);
  };
  const handleClosePreheatDialog = () => {
    setIsPreheatDialogOpen(false);
  };

  const handleLightChange = (status) => {
    if (status === true) {
      octoprintDataStore
        .octolight(props.octoPrintLink, props.printerApiKey, "turnOn")
        .then((data) => {
          if (data) {
            setLightState(data.state);
          }
        })
        .catch((err) => {
          console.log("Error turning light on", err);
        });
    } else if (status === false) {
      octoprintDataStore
        .octolight(props.octoPrintLink, props.printerApiKey, "turnOff")
        .then((data) => {
          if (data) {
            setLightState(data.state);
          }
        })
        .catch((err) => {
          console.log("Error turning light off", err);
        });
    }
  };

  const triggerGeneralDataRefresh = () => {
    setGeneralDataRefresh(!generalDataRefresh);
  };

  const downloadFile = () => {
    window.open(downloadLink, "_blank");
  };

  if (!isOnline) {
    // TODO: This line is against the rules, we cannot sort the cards before they have all been rendered...
    props.sendToFront(props.printerName, "offline");
    return (
      <DisconnectedPrinterCard
        printerName={props.printerName}
        octoPrintLink={props.octoPrintLink}
      />
    );
  } else {
    props.sendToFront(props.printerName, "online");
    return (
      <Card sx={{ width: 400 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: props.colorCode ? props.colorCode : printerThemeColor,
              }}
              aria-label={props.printerName}
            >
              {props.printerName ? props.printerName.charAt(0) : ""}
            </Avatar>
          }
          action={
            <PowerMenu
              octoprintUrl={props.octoPrintLink}
              datastore={octoprintDataStore}
              apiKey={props.printerApiKey}
            />
          }
          title={props.printerName}
          subheader={currentPrinterState}
        />
        {webcamEnabled ? (
          <Container sx={{ height: "285px" }}>
            {document.visibilityState === "visible" ? (
              isMobile === true ? (
                <Image
                  src={
                    streamUrl === "/webcam/?action=stream"
                      ? octoPrintLink + "/webcam/?action=stream"
                      : streamUrl
                  }
                  disableTransition={true}
                  aspectRatio={16 / 9}
                />
              ) : (
                <Image
                  src={
                    streamUrl === "/webcam/?action=stream"
                      ? octoPrintLink + "/webcam/?action=stream"
                      : streamUrl
                  }
                  disableSpinner={true}
                  disableTransition={false}
                  aspectRatio={16 / 9}
                />
              )
            ) : null}
          </Container>
        ) : (
          <Container sx={{ height: "285px" }}>
            <Image
              src="./printer_16x9.png"
              disableSpinner={true}
              aspectRatio={16 / 9}
            />
          </Container>
        )}
        <CardContent>
          <Container>
            <Grid container spacing={3}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={6}>
                  <Typography align="left">Print Name:</Typography>
                  {!props.isCNC ? (
                    <>
                      <Typography align="left">Hot End Temp:</Typography>
                      <Typography align="left">Bed Actual Temp:</Typography>
                    </>
                  ) : null}
                  <Typography align="left">Time Elapsed:</Typography>
                  <Typography align="left" gutterBottom>
                    Time Left:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TickerByLength
                    text={currentFileName ? currentFileName : "N/A"}
                    maxLen={23}
                    speed={3}
                    mode="await"
                  />
                  {!props.isCNC ? (
                    <>
                      <Typography align="right">
                        {nozzleTempActual} / {nozzleTempTarget}
                      </Typography>
                      <Typography align="right">
                        {bedTempActual} / {bedTempTarget}
                      </Typography>
                    </>
                  ) : null}
                  <Typography align="right">{elapsedTime}</Typography>
                  <Typography align="right" gutterBottom>
                    {timeRemaining}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Container>
          <Typography align="left">Print Progress:</Typography>
          <LinearProgressWithLabel value={printCompletionPercent} />
        </CardContent>
        <CardActions disableSpacing>
          {printerStatus === "N/A" ? (
            <Tooltip title="Connect">
              <IconButton aria-label="connect" onClick={handleConnect}>
                <UsbIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Disconnect">
              <IconButton aria-label="Disconnect" onClick={handleDisconnect}>
                <UsbOff />
              </IconButton>
            </Tooltip>
          )}
          {printerStatus === "Printing" ||
          printerStatus === "Paused" ||
          printerStatus === "Pausing" ? (
            <div>
              {isPaused ? (
                <Tooltip title="Resume Print">
                  <IconButton
                    aria-label="resume print"
                    onClick={handleResumeIconClick}
                  >
                    <NotStartedIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Pause Print">
                  <IconButton
                    aria-label="pause print"
                    onClick={handlePauseIconClick}
                  >
                    <PauseCircleIcon />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Cancel Print">
                <IconButton
                  aria-label="cancel print"
                  onClick={handleStopIconClick}
                >
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <div>
              <Tooltip title="Start Print">
                <span>
                  <IconButton
                    aria-label="start print"
                    onClick={handleStartIconClick}
                    disabled={!isConnected}
                  >
                    <PlayCircleIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          )}
          {printerStatus !== "Printing" ? (
            <Tooltip title="GCode Terminal">
              <span>
                <IconButton
                  aria-label="gcode terminal"
                  onClick={handleGCodeIconClick}
                  disabled={!isConnected}
                >
                  <TerminalIcon />
                </IconButton>
              </span>
            </Tooltip>
          ) : null}
          {printerStatus !== "Printing" ? (
            <Tooltip title="Control">
              <span>
                <IconButton
                  aria-label="control printer"
                  disabled={!isConnected}
                >
                  <FontAwesomeIcon icon={faArrowsAlt} />
                </IconButton>
              </span>
            </Tooltip>
          ) : null}
          {printerStatus !== "Printing" && !props.isCNC ? (
            <Tooltip title="Preheat">
              <span>
                <IconButton
                  aria-label="preheat"
                  onClick={handlePreheatIconClick}
                  disabled={!isConnected}
                >
                  <DeviceThermostatIcon />
                </IconButton>
              </span>
            </Tooltip>
          ) : printerStatus === "printing" && !props.isCNC ? (
            <Tooltip title="Change Temperature">
              <span>
                <IconButton
                  aria-label="change-temperature"
                  onClick={handlePreheatIconClick}
                  disabled={!isConnected}
                >
                  <DeviceThermostatIcon />
                </IconButton>
              </span>
            </Tooltip>
          ) : null}
          <Tooltip title="Timelapse Library">
            <span>
              <IconButton
                aria-label="timelapse"
                onClick={handleTimelapseIconClick}
                disabled={!isConnected}
              >
                <VideoLibraryIcon />
              </IconButton>
            </span>
          </Tooltip>
          {props.octolight ? (
            lightState ? (
              <Tooltip title="Turn Off">
                <span>
                  <IconButton
                    aria-label="light-off"
                    onClick={() => {
                      handleLightChange(false);
                    }}
                    disabled={!isConnected}
                  >
                    <FontAwesomeIcon icon={lightOutlined} />
                  </IconButton>
                </span>
              </Tooltip>
            ) : (
              <Tooltip title="Turn On">
                <span>
                  <IconButton
                    aria-label="light-on"
                    onClick={() => {
                      handleLightChange(true);
                    }}
                    disabled={!isConnected}
                  >
                    <FontAwesomeIcon icon={lightSolid} />
                  </IconButton>
                </span>
              </Tooltip>
            )
          ) : null}
          <Tooltip title="OctoPrint">
            <IconButton aria-label="octoprint" onClick={handleOctoIconClick}>
              <FontAwesomeIcon icon={faOctopusDeploy} />
            </IconButton>
          </Tooltip>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="details"
          >
            <Tooltip title="More Details">
              <ExpandMoreIcon />
            </Tooltip>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Container>
              <Grid container spacing={3}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography align="left">Server Version:</Typography>
                    <Typography align="left">Current File Download:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      {generalData !== "N/A" ? generalData.text : generalData}
                    </Typography>
                    <Typography align="right">
                      {isConnected ? (
                        <Button variant="text" onClick={downloadFile}>
                          download
                        </Button>
                      ) : (
                        <text>Unavailable</text>
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </CardContent>
        </Collapse>
        <OctoprintDialog
          isOpen={octoPrintDialogOpen}
          printerName={props.printerName}
          octoprintUrl={props.octoPrintLink}
          closeDialog={handleCloseOctoPrintDialog}
        />
        <IframeDialog
          isOpen={iFrameDialogOpen}
          printerName={props.printerName}
          octoprintUrl={props.octoPrintLink}
          datastore={octoprintDataStore}
          apiKey={props.printerApiKey}
          closeDialog={handleCloseIframeDialog}
          triggerRefresh={triggerGeneralDataRefresh}
        />
        <StartPrintDialog
          isOpen={isStartPrintDialogOpen}
          closeDialog={handleCloseStartPrintDialog}
          printerFiles={files}
          octoprintUrl={props.octoPrintLink}
          datastore={octoprintDataStore}
          apiKey={props.printerApiKey}
          triggerRefresh={triggerGeneralDataRefresh}
        />
        <TimelapseDialog
          isOpen={isTimelapseDialogOpen}
          closeDialog={handleCloseTimelapseDialog}
          timelapseData={timelapseData}
          octoprintUrl={props.octoPrintLink}
          datastore={octoprintDataStore}
          apiKey={props.printerApiKey}
        />
        <GCodeDialog
          isOpen={isGCodeDialogOpen}
          closeDialog={handleCloseGCodeDialog}
          octoprintUrl={props.octoPrintLink}
          datastore={octoprintDataStore}
          apiKey={props.printerApiKey}
        />
        <PreheatDialog
          isOpen={isPreheatDialogOpen}
          closeDialog={handleClosePreheatDialog}
          printerFiles={files}
          octoprintUrl={props.octoPrintLink}
          datastore={octoprintDataStore}
          apiKey={props.printerApiKey}
          printerName={props.printerName}
        />
        <CancelConfirmDialog
          title="Cancel Print?"
          head="Are you sure you want to cancel the current print job? "
          open={cancelDialogOpen}
          setOpen={setCancelDialogOpen}
          onConfirm={() => {
            handleCancelPrint();
          }}
        />
      </Card>
    );
  }
});
export default PrinterCard;
