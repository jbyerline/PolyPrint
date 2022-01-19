import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
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
import { faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";

import OctoprintDialog from "../Dialog/OctoprintDialog";
import OctoprintDataStore from "../Store/OctoprintDataStore";
import IframeDialog from "../Dialog/IframeDialog";
import TickerByLength from "../Ticker/TickerByLength";
import ConnectIcon from "../Icons/ConnectIcon";
import LinearProgressWithLabel from "../Progress/LinearProgressWithLabel";
import PowerMenu from "../Menu/PowerMenu";
import StartPrintDialog from "../Dialog/StartPrintDialog";
import PreheatDialog from "../Dialog/PreheatDialog";

import DisconnectedPrinterCard from "./DisconnectedPrinterCard";

const octoprintDataStore = new OctoprintDataStore();

const ExpandMore = styled((props) => {
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
  const [generalData, setGeneralData] = useState();
  const [printerState, setPrinterState] = useState();
  const [jobState, setJobState] = useState();
  const [files, setFiles] = useState();
  const [generalError, setGeneralError] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isStartPrintDialogOpen, setIsStartPrintDialogOpen] =
    React.useState(false);
  const [isPreheatDialogOpen, setIsPreheatDialogOpen] = React.useState(false);

  const printerName = generalData ? generalData.profiles._default.name : "N/A";
  const printerThemeColor = generalData
    ? generalData.appearance.color
    : "black";
  const printerStatus = printerState ? printerState[0].state.text : "N/A";
  const printerVersion = generalData ? generalData.text : "N/A";
  const bedTempActual = printerState
    ? printerState[0].temperature.bed.actual
    : "N/A";
  const bedTempTarget = printerState
    ? printerState[0].temperature.bed.target
    : "N/A";
  const nozzleTempActual = printerState
    ? printerState[0].temperature.tool0.actual
    : "N/A";
  const nozzleTempTarget = printerState
    ? printerState[0].temperature.tool0.target
    : "N/A";
  const currentFileName = jobState ? jobState[0].job.file.display : "N/A";
  const printCompletionPercent = jobState ? jobState[0].progress.completion : 0;
  const currentFile = files
    ? files[0].files.find(({ name }) => name === currentFileName)
    : "N/A";
  const downloadLink =
    currentFile !== "N/A" && currentFile ? currentFile.refs.download : "N/A";

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

  useEffect(() => {
    octoprintDataStore
      .fetchGeneralInfo(props.octoPrintLink, props.printerApiKey)
      .then((data) => {
        setGeneralData(Object.assign(...data));
        setGeneralError(false);
      })
      .catch((err) => {
        console.log("Error retrieving general printer info", err);
      });

    octoprintDataStore
      .fetchAllFiles(props.octoPrintLink, props.printerApiKey)
      .then((data) => {
        setFiles(data);
      })
      .catch((err) => console.log("Error retrieving files from printer", err));
  }, [generalDataRefresh]);

  useEffect(() => {
    fetchReoccurringData();
    const interval = setInterval(() => {
      if (!generalError) {
        fetchReoccurringData();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [generalError]);

  const fetchReoccurringData = () => {
    octoprintDataStore
      .fetchPrinterStatus(props.octoPrintLink, props.printerApiKey)
      .then((data) => {
        setPrinterState(data);
      })
      .catch((err) => console.log("Error retrieving printer status info", err));

    octoprintDataStore
      .fetchJobStatus(props.octoPrintLink, props.printerApiKey)
      .then((data) => {
        setJobState(data);
      })
      .catch((err) => console.log("Error retrieving job info", err));
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
  const handlePreheatIconClick = () => {
    setIsPreheatDialogOpen(true);
  };
  const handleClosePreheatDialog = () => {
    setIsPreheatDialogOpen(false);
  };

  const triggerGeneralDataRefresh = () => {
    setGeneralDataRefresh(!generalDataRefresh);
  };

  const downloadFile = () => {
    window.open(downloadLink, "_blank");
  };

  if (!generalData) {
    return (
      <DisconnectedPrinterCard
        printerName={props.printerName}
        octoPrintLink={props.octoPrintLink}
      />
    );
  } else {
    return (
      <Card sx={{ width: 400 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: printerThemeColor }}
              aria-label={props.printerName}
            >
              {props.printerName ? props.printerName.charAt(0) : ""}
            </Avatar>
          }
          action={<PowerMenu />}
          title={props.printerName}
          subheader={printerStatus}
        />

        <Container sx={{ height: "285px" }}>
          <CardMedia
            component="img"
            image={octoPrintLink + "/webcam/?action=stream"}
            alt="Printer"
          />
        </Container>
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
                  <Typography align="left">Hot End Temp:</Typography>
                  <Typography align="left">Bed Actual Temp:</Typography>
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
                  <Typography align="right">
                    {nozzleTempActual} / {nozzleTempTarget}
                  </Typography>
                  <Typography align="right">
                    {bedTempActual} / {bedTempTarget}
                  </Typography>
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
          <ConnectIcon
            dataStore={octoprintDataStore}
            octoPrintLink={props.octoPrintLink}
            apiKey={props.printerApiKey}
          />
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
                <IconButton
                  aria-label="start print"
                  onClick={handleStartIconClick}
                >
                  <PlayCircleIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
          <Tooltip title="GCode Terminal">
            <IconButton aria-label="gcode terminal">
              <TerminalIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Control">
            <IconButton aria-label="control printer">
              <FontAwesomeIcon icon={faArrowsAlt} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Preheat">
            <IconButton aria-label="preheat" onClick={handlePreheatIconClick}>
              <DeviceThermostatIcon />
            </IconButton>
          </Tooltip>
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
                    <Typography align="right">{printerVersion}</Typography>
                    <Typography align="right">
                      <Button variant="text" onClick={downloadFile}>
                        download
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </CardContent>
        </Collapse>
        <OctoprintDialog
          isOpen={octoPrintDialogOpen}
          printerName={printerName}
          octoprintUrl={props.octoPrintLink}
          closeDialog={handleCloseOctoPrintDialog}
        />
        <IframeDialog
          isOpen={iFrameDialogOpen}
          printerName={printerName}
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
        <PreheatDialog
          isOpen={isPreheatDialogOpen}
          closeDialog={handleClosePreheatDialog}
          printerFiles={files}
          octoprintUrl={props.octoPrintLink}
          datastore={octoprintDataStore}
          apiKey={props.printerApiKey}
          printerName={props.printerName}
        />
      </Card>
    );
  }
});
export default PrinterCard;
