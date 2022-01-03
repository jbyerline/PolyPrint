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
import PushPinIcon from "@mui/icons-material/PushPin";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOctopusDeploy } from "@fortawesome/free-brands-svg-icons";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";

import OctoprintDialog from "../Dialog/OctoprintDialog";
import OctoprintDataStore from "../Store/OctoprintDataStore";
import IframeDialog from "../Dialog/IframeDialog";

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

  const printerName = generalData
    ? generalData.profiles._default.name
    : "Unknown";
  const printerThemeColor = generalData
    ? generalData.appearance.color
    : "black";
  const printerStatus = printerState ? printerState[0].state.text : "Unknown";
  const printerVersion = generalData ? generalData.text : "Unknown";
  const bedTempActual = printerState
    ? printerState[0].temperature.bed.actual
    : "Unknown";
  const bedTempTarget = printerState
    ? printerState[0].temperature.bed.target
    : "Unknown";
  const nozzleTempActual = printerState
    ? printerState[0].temperature.tool0.actual
    : "Unknown";
  const nozzleTempTarget = printerState
    ? printerState[0].temperature.tool0.target
    : "Unknown";

  useEffect(() => {
    octoprintDataStore
      .fetchGeneralInfo(props.octoPrintLink, props.printerApiKey)
      .then((data) => {
        // Flatten data
        console.log(Object.assign(...data));
        setGeneralData(Object.assign(...data));
      })
      .catch((err) => console.log("Error retrieving general offer info", err));
  }, [generalDataRefresh]);

  useEffect(() => {
    const interval = setInterval(() => {
      octoprintDataStore
        .fetchPrinterStatus(props.octoPrintLink, props.printerApiKey)
        .then((data) => {
          console.log(data);
          setPrinterState(data);
        })
        .catch((err) =>
          console.log("Error retrieving general offer info", err)
        );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOctoPrintClick = () => {
    window.octoPrintDialogOpen(octoPrintLink, "_blank");
  };

  const handleOctoIconClick = () => {
    if (generalData.server.allowFraming === false) {
      console.log("Cannot octoPrintDialogOpen iFrame");
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

  const triggerGeneralDataRefresh = () => {
    setGeneralDataRefresh(!generalDataRefresh);
  };

  return (
    <Card sx={{ width: 400 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: printerThemeColor }} aria-label={printerName}>
            {printerName ? printerName.charAt(0) : ""}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={printerName}
        subheader={printerStatus}
      />
      <CardMedia
        component="img"
        image={octoPrintLink + "/webcam/?action=stream"}
        alt="Printer"
      />
      <CardContent>
        <Button onClick={handleOctoPrintClick}>Local OctoPrint </Button>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <PushPinIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="octo-print" onClick={handleOctoIconClick}>
          <FontAwesomeIcon icon={faOctopusDeploy} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="details"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography align="left">Server Version: {printerVersion}</Typography>
          <Typography align="left">
            Hot End Actual Temp: {nozzleTempActual}
          </Typography>
          <Typography align="left">
            Hot End Target Temp: {nozzleTempTarget}
          </Typography>
          <Typography align="left">Bed Actual Temp: {bedTempActual}</Typography>
          <Typography align="left">Bed Target Temp: {bedTempTarget}</Typography>
          <Typography align="left">Last Print Information:</Typography>
          <Typography align="left">File Name:</Typography>
          <Typography align="left">Time Elapsed:</Typography>
          <Typography align="left">Status: {printerStatus}</Typography>
          <Typography align="left">Link to Download File:</Typography>
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
    </Card>
  );
});
export default PrinterCard;
