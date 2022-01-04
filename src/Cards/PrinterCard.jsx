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
import UsbIcon from "@mui/icons-material/Usb";
import UsbOffIcon from "@mui/icons-material/UsbOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOctopusDeploy } from "@fortawesome/free-brands-svg-icons";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Tooltip } from "@mui/material";
import Ticker from "react-ticker";

import OctoprintDialog from "../Dialog/OctoprintDialog";
import OctoprintDataStore from "../Store/OctoprintDataStore";
import IframeDialog from "../Dialog/IframeDialog";
import TickerByLength from "../Ticker/TickerByLength";
import ConnectIcon from "../Icons/ConnectIcon";

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
  const currentFileName = jobState ? jobState[0].job.file.display : "Unknown";

  let elapsedTime;
  if (jobState) {
    console.log(jobState[0].progress.printTime);
    let date = new Date(null);
    date.setSeconds(jobState[0].progress.printTime);
    elapsedTime = date.toISOString().substr(11, 8);
  } else {
    elapsedTime = "Unknown";
  }

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
    fetchReoccurringData();
    const interval = setInterval(() => fetchReoccurringData(), 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchReoccurringData = () => {
    octoprintDataStore
      .fetchPrinterStatus(props.octoPrintLink, props.printerApiKey)
      .then((data) => {
        console.log(data);
        setPrinterState(data);
      })
      .catch((err) => console.log("Error retrieving printer status info", err));

    octoprintDataStore
      .fetchJobStatus(props.octoPrintLink, props.printerApiKey)
      .then((data) => {
        console.log(data);
        setJobState(data);
      })
      .catch((err) => console.log("Error retrieving job info", err));
  };

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
        <Tooltip title="Pin to Front">
          <IconButton aria-label="add to favorites">
            <PushPinIcon />
          </IconButton>
        </Tooltip>
        <ConnectIcon
          dataStore={octoprintDataStore}
          octoPrintLink={props.octoPrintLink}
          apiKey={props.printerApiKey}
        />
        <Tooltip title="OctoPrint">
          <IconButton aria-label="octo-print" onClick={handleOctoIconClick}>
            <FontAwesomeIcon icon={faOctopusDeploy} />
          </IconButton>
        </Tooltip>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="details"
        >
          <Tooltip title="Show Details">
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
                  <Typography align="left">Hot End Actual Temp:</Typography>
                  <Typography align="left">Hot End Target Temp:</Typography>
                  <Typography align="left">Bed Actual Temp:</Typography>
                  <Typography align="left" gutterBottom>
                    Bed Target Temp:
                  </Typography>
                  <Typography align="left">Print Information:</Typography>
                  <Typography align="left">File Name:</Typography>
                  <Typography align="left">Time Elapsed:</Typography>
                  <Typography align="left">Link to Download File:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">{printerVersion}</Typography>
                  <Typography align="right">{nozzleTempActual}</Typography>
                  <Typography align="right">{nozzleTempTarget}</Typography>
                  <Typography align="right">{bedTempActual}</Typography>
                  <Typography align="right" gutterBottom>
                    {bedTempTarget}
                  </Typography>
                  <Typography align="right">-</Typography>
                  <TickerByLength
                    text={currentFileName ? currentFileName : "Unknown"}
                    maxLen={23}
                    speed={3}
                    mode="await"
                  />
                  <Typography align="right">{elapsedTime}</Typography>
                  <Typography align="right">Link</Typography>
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
    </Card>
  );
});
export default PrinterCard;
