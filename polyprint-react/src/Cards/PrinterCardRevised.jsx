import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import CardContent from "@mui/material/CardContent";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";

import PowerMenu from "../Menu/PowerMenu";
import { isNotEmpty, isMobileDevice } from "../Utils/utils";

import InfoTable from "./Subcomponents/InfoTable";
import DisconnectedPrinterCard from "./DisconnectedPrinterCard";
import WebcamContainer from "./Subcomponents/WebcamContainer";
import CardAvatar from "./Subcomponents/CardAvatar";
import LowerIconBar from "./Subcomponents/LowerIconBar";

const PrinterCardRevised = observer((props) => {
  const {
    configName,
    url,
    apiKey,
    hasOctolight,
    configColor,
    isCnc,
    datastore,
  } = props;

  const ds = datastore;

  const [isMobile] = useState(isMobileDevice());
  const [fullDataRefresh, setFullDataRefresh] = useState(false);

  const generalInfo = () => {
    return isNotEmpty(ds.generalInfo) ? ds.generalInfo : null;
  };
  const printerStatus = () => {
    return isNotEmpty(ds.printerStatus) ? ds.printerStatus : null;
  };
  const jobStatus = () => {
    return isNotEmpty(ds.jobStatus) ? ds.jobStatus : null;
  };
  const connectionInfo = () => {
    return isNotEmpty(ds.connectionInfo) ? ds.connectionInfo : null;
  };
  const gcodeFiles = () => {
    return isNotEmpty(ds.gcodeFiles) ? ds.gcodeFiles : null;
  };
  const timelapseFiles = () => {
    return isNotEmpty(ds.timelapseFiles) ? ds.timelapseFiles : null;
  };

  // Load initial data and manual trigger refresh upon actions
  useEffect(() => {
    ds.fetchVersionInfo(url, apiKey).then((prom) => {
      if (isNotEmpty(ds.versionInfo)) {
        ds.fetchGeneralInfo(url, apiKey);
        ds.fetchConnectionInfo(url, apiKey);
        ds.fetchAllFiles(url, apiKey);
        ds.fetchTimelapses(url, apiKey);
      }
    });
  }, [fullDataRefresh]);

  // Every 4 sec, update Job and Printer Status
  useEffect(() => {
    const interval = setInterval(() => {
      if (isNotEmpty(ds.versionInfo)) {
        ds.fetchJobStatus(url, apiKey);
        ds.fetchPrinterStatus(url, apiKey);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Every 10 sec, update General Info and Online Printers
  useEffect(() => {
    const interval = setInterval(() => {
      ds.fetchVersionInfo(url, apiKey).then((prom) => {
        if (isNotEmpty(ds.versionInfo)) {
          ds.fetchGeneralInfo(url, apiKey);
          ds.fetchConnectionInfo(url, apiKey);
          ds.fetchAllFiles(url, apiKey);
          ds.fetchTimelapses(url, apiKey);
        }
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (
    generalInfo() &&
    connectionInfo() &&
    jobStatus() &&
    gcodeFiles() &&
    timelapseFiles()
  ) {
    props.sendToFront(configName, "online");
    return (
      <Card sx={{ width: 400 }}>
        <CardHeader
          avatar={
            <CardAvatar
              configColor={configColor}
              configName={configName}
              generalInfo={generalInfo}
            />
          }
          action={
            <PowerMenu octoprintUrl={url} datastore={ds} apiKey={apiKey} />
          }
          title={
            <Tooltip title={url} arrow={true}>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => {
                  window.open(url, "_blank");
                }}
              >
                {configName ? configName : generalInfo().appearance.name}
              </Button>
            </Tooltip>
          }
          subheader={connectionInfo().current.state}
        />
        <WebcamContainer
          webcamEnabled={generalInfo().webcam.webcamEnabled}
          streamUrl={url + generalInfo().webcam.streamUrl}
          isMobile={isMobile}
        />
        {printerStatus() && connectionInfo().current.state !== "Closed" ? (
          <CardContent>
            <InfoTable
              printerStatus={printerStatus}
              jobStatus={jobStatus}
              isCnc={isCnc}
            />
          </CardContent>
        ) : null}
        <LowerIconBar
          url={url}
          apiKey={apiKey}
          configName={configName}
          isCnc={isCnc}
          hasOctolight={hasOctolight}
          dataStore={ds}
          generalInfo={generalInfo}
          connectionInfo={connectionInfo}
          gcodeFiles={gcodeFiles}
          timelapseFiles={timelapseFiles}
          fullDataRefresh={fullDataRefresh}
          setFullDataRefresh={setFullDataRefresh}
          isMobile={isMobile}
        />
      </Card>
    );
  } else {
    props.sendToFront(configName, "offline");
    return <DisconnectedPrinterCard url={url} configName={configName} />;
  }
});
export default PrinterCardRevised;
