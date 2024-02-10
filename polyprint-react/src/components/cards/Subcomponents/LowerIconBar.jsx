import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOctopusDeploy } from "@fortawesome/free-brands-svg-icons";
import CardActions from "@mui/material/CardActions";
import UsbIcon from "@mui/icons-material/Usb";
import { UsbOff } from "@mui/icons-material";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import { faLightbulb as lightOutlined } from "@fortawesome/free-regular-svg-icons";
import { faLightbulb as lightSolid } from "@fortawesome/free-solid-svg-icons";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

import OctoprintDialog from "../../dialog/OctoprintDialog";
import StartPrintDialog from "../../dialog/StartPrintDialog";
import TimelapseDialog from "../../dialog/TimelapseDialog";
import PreheatDialog from "../../dialog/PreheatDialog";
import CancelConfirmDialog from "../../dialog/CancelConfirmDialog";
import IframeDialog from "../../dialog/IframeDialog";
import KlipperIcon from "../../icons/KlipperIcon";

export default function LowerIconBar(props) {
  const {
    url,
    apiKey,
    configName,
    isCnc,
    hasOctolight,
    dataStore,
    gcodeFiles,
    timelapseFiles,
    generalInfo,
    connectionInfo,
    setFullDataRefresh,
    fullDataRefresh,
    isMobile,
    setAlertState,
  } = props;

  const [lightState, setLightState] = useState(false);
  const [octoPrintDialogOpen, setOctoPrintDialogOpen] = useState(false);
  const [startPrintDialogOpen, setStartPrintDialogOpen] = useState(false);
  const [timelapseDialogOpen, setTimelapseDialogOpen] = useState(false);
  const [preheatDialogOpen, setPreheatDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [iFrameDialogOpen, setIframeDialogOpen] = useState(false);

  const isPrinting = () => {
    return ["Printing", "Paused", "Pausing"].some(
      (state) => state === connectionInfo().current.state
    );
  };

  const isPaused = () => {
    return ["Paused", "Pausing"].some(
      (state) => state === connectionInfo().current.state
    );
  };

  const isConnected = () => {
    return !["Closed"].some(
      (state) => state === connectionInfo().current.state
    );
  };

  const handleLightChange = (status) => {
    dataStore
      .octolight(url, apiKey, status ? "turnOn" : "turnOff")
      .then((data) => {
        if (data) {
          setLightState(data.state);
        }
      })
      .catch((err) => {
        console.log("Error toggling Octolight", err);
      });
  };

  return (
    <CardActions disableSpacing>
      {/* --- USB Connection icons --- */}
      {connectionInfo().current.state === "Closed" ? (
        <Tooltip title="Connect">
          <IconButton
            onClick={() => {
              dataStore
                .modifyPrinterConnection(url, apiKey, "connect")
                .then(() => {
                  setFullDataRefresh(!fullDataRefresh);
                });
            }}
          >
            <UsbIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Disconnect">
          <IconButton
            onClick={() => {
              dataStore
                .modifyPrinterConnection(url, apiKey, "disconnect")
                .then(() => {
                  setFullDataRefresh(!fullDataRefresh);
                });
            }}
          >
            <UsbOff />
          </IconButton>
        </Tooltip>
      )}
      {/* --- Currently Printing --- */}
      {isPrinting() ? (
        <>
          {isPaused() ? (
            <Tooltip title="Resume Print">
              <IconButton
                onClick={() =>
                  dataStore.sendJobCommand(url, apiKey, "pause", "pause")
                }
              >
                <NotStartedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Pause Print">
              <IconButton
                onClick={() =>
                  dataStore.sendJobCommand(url, apiKey, "pause", "resume")
                }
              >
                <PauseCircleIcon />
              </IconButton>
            </Tooltip>
          )}
          {/* --- Always show "Cancel" while print is in progress --- */}
          <Tooltip title="Cancel Print">
            <IconButton onClick={() => setCancelDialogOpen(true)}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Start Print">
          <span>
            <IconButton
              onClick={() => setStartPrintDialogOpen(true)}
              disabled={!isConnected()}
            >
              <PlayCircleIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
      {!isCnc ? (
        <Tooltip title={isPrinting() ? "Change Temperature" : "Preheat"}>
          <span>
            <IconButton
              onClick={() => setPreheatDialogOpen(true)}
              disabled={!isConnected()}
            >
              <DeviceThermostatIcon />
            </IconButton>
          </span>
        </Tooltip>
      ) : null}

      {/*{printerStatus !== "Printing" ? (*/}
      {/*    <Tooltip title="GCode Terminal">*/}
      {/*    <span>*/}
      {/*      <IconButton*/}
      {/*          onClick={handleGCodeIconClick}*/}
      {/*          disabled={!isConnected}*/}
      {/*      >*/}
      {/*        <TerminalIcon />*/}
      {/*      </IconButton>*/}
      {/*    </span>*/}
      {/*    </Tooltip>*/}
      {/*) : null}*/}
      {/*{printerStatus !== "Printing" ? (*/}
      {/*    <Tooltip title="Control">*/}
      {/*    <span>*/}
      {/*      <IconButton*/}
      {/*          disabled={!isConnected}*/}
      {/*      >*/}
      {/*        <FontAwesomeIcon icon={faArrowsAlt} />*/}
      {/*      </IconButton>*/}
      {/*    </span>*/}
      {/*    </Tooltip>*/}
      {/*) : null}*/}
      <Tooltip title="Timelapse Library">
        <span>
          <IconButton
            onClick={() => setTimelapseDialogOpen(true)}
            disabled={!isConnected}
          >
            <VideoLibraryIcon />
          </IconButton>
        </span>
      </Tooltip>
      {hasOctolight ? (
        <Tooltip title={lightState ? "Turn Off" : "Turn On"}>
          <span>
            <IconButton
              onClick={() => {
                handleLightChange(!lightState);
              }}
            >
              <FontAwesomeIcon icon={lightState ? lightOutlined : lightSolid} />
            </IconButton>
          </span>
        </Tooltip>
      ) : null}
      <Tooltip title="OctoPrint">
        <IconButton
          aria-label="octoprint"
          onClick={() => {
            if (generalInfo().server.allowFraming === false) {
              setIframeDialogOpen(true);
            } else {
              setOctoPrintDialogOpen(true);
            }
          }}
        >
          <FontAwesomeIcon icon={faOctopusDeploy} />
        </IconButton>
      </Tooltip>
      {/*TODO: Enable Klipper support*/}
      {/*<Tooltip title="Klipper">*/}
      {/*  <IconButton*/}
      {/*    aria-label="klipper"*/}
      {/*    onClick={() => {*/}
      {/*      console.log("Klipper was clicked!");*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <KlipperIcon height={40} width={40} fill="#808080" />*/}
      {/*  </IconButton>*/}
      {/*</Tooltip>*/}
      {/*<ExpandMore*/}
      {/*    expand={expanded}*/}
      {/*    onClick={handleExpandClick}*/}
      {/*    aria-expanded={expanded}*/}
      {/*    aria-label="details"*/}
      {/*>*/}
      {/*  <Tooltip title="More Details">*/}
      {/*    <ExpandMoreIcon />*/}
      {/*  </Tooltip>*/}
      {/*</ExpandMore>*/}
      <OctoprintDialog
        isOpen={octoPrintDialogOpen}
        printerName={configName}
        octoprintUrl={url}
        closeDialog={() => setOctoPrintDialogOpen(false)}
      />
      <IframeDialog
        isOpen={iFrameDialogOpen}
        printerName={configName}
        octoprintUrl={url}
        datastore={dataStore}
        apiKey={apiKey}
        closeDialog={() => setIframeDialogOpen(false)}
        triggerRefresh={() => setFullDataRefresh(!fullDataRefresh)}
      />
      <StartPrintDialog
        isOpen={startPrintDialogOpen}
        closeDialog={() => setStartPrintDialogOpen(false)}
        printerFiles={gcodeFiles}
        octoprintUrl={url}
        datastore={dataStore}
        apiKey={apiKey}
        triggerRefresh={() => setFullDataRefresh(!fullDataRefresh)}
        isMobile={isMobile}
        setAlertState={setAlertState}
      />
      <TimelapseDialog
        isOpen={timelapseDialogOpen}
        closeDialog={() => setTimelapseDialogOpen(false)}
        timelapseData={timelapseFiles}
        octoprintUrl={url}
        datastore={dataStore}
        apiKey={apiKey}
        isMobile={isMobile}
      />
      {/*<GCodeDialog*/}
      {/*  isOpen={isGCodeDialogOpen}*/}
      {/*  closeDialog={handleCloseGCodeDialog}*/}
      {/*  octoprintUrl={props.octoPrintLink}*/}
      {/*  datastore={octoprintDataStore}*/}
      {/*  apiKey={props.printerApiKey}*/}
      {/*/>*/}
      <PreheatDialog
        isOpen={preheatDialogOpen}
        closeDialog={() => setPreheatDialogOpen(false)}
        printerFiles={gcodeFiles}
        octoprintUrl={url}
        datastore={dataStore}
        apiKey={apiKey}
        printerName={configName}
      />
      <CancelConfirmDialog
        title="Cancel Print?"
        head="Are you sure you want to cancel the current print job? "
        open={cancelDialogOpen}
        setOpen={setCancelDialogOpen}
        onConfirm={() => {
          dataStore.sendJobCommand(url, apiKey, "cancel");
        }}
      />
    </CardActions>
  );
}
