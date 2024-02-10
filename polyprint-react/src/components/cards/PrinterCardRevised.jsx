import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import CardContent from "@mui/material/CardContent";
import { Backdrop, CircularProgress, Paper, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import PowerMenu from "../menu/PowerMenu";
import { isNotEmpty, isMobileDevice } from "../../utils/utils";

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
    setAlertState,
  } = props;

  const ds = datastore;

  const [isMobile] = useState(isMobileDevice());
  const [fullDataRefresh, setFullDataRefresh] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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
    ds.fetchVersionInfo(url, apiKey).then(() => {
      if (isNotEmpty(ds.versionInfo)) {
        ds.fetchGeneralInfo(url, apiKey);
        ds.fetchConnectionInfo(url, apiKey);
        ds.fetchAllFiles(url, apiKey);
        ds.fetchTimelapses(url, apiKey);
      }
    });
  }, [fullDataRefresh]);

  // Every 2 sec, update Job and Printer Status
  useEffect(() => {
    const interval = setInterval(() => {
      if (isNotEmpty(ds.versionInfo)) {
        ds.fetchJobStatus(url, apiKey);
        ds.fetchPrinterStatus(url, apiKey);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Every 15 sec, update General Info and Online Printers
  useEffect(() => {
    const interval = setInterval(() => {
      ds.fetchVersionInfo(url, apiKey).then(() => {
        if (isNotEmpty(ds.versionInfo)) {
          ds.fetchGeneralInfo(url, apiKey);
          ds.fetchConnectionInfo(url, apiKey);
          ds.fetchAllFiles(url, apiKey);
          ds.fetchTimelapses(url, apiKey);
        }
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const [isDragOver, setIsDragOver] = useState(false);
  let leaveTimeout;

  // Drag and drop event handlers
  const handleDragOver = (e) => {
    clearTimeout(leaveTimeout);
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    leaveTimeout = setTimeout(() => {
      setIsDragOver(false);
    }, 100);
  };

  const handleDrop = (e) => {
    clearTimeout(leaveTimeout);
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      if (
        ["gcode", "bgcode"].includes(file.name.toLowerCase().split(".").pop())
      ) {
        uploadFile(file).then(() => {
          setAlertState({
            isOpen: true,
            message: "File uploaded successfully",
            level: "success",
          });
        });
      } else {
        setAlertState({
          isOpen: true,
          message: "Only .gcode and .bgcode files are supported",
          level: "error",
        });
      }
    }
  };

  const uploadFile = async (file) => {
    setIsUploading(true);
    try {
      await ds.uploadFile(url, apiKey, file, false);
    } catch (error) {
      console.error("Error uploading file", error);
      setAlertState({
        isOpen: true,
        message: "Error uploading file",
        level: "error",
      });
      setIsUploading(false);
    } finally {
      setIsUploading(false);
    }
  };

  if (
    generalInfo() &&
    connectionInfo() &&
    jobStatus() &&
    gcodeFiles() &&
    timelapseFiles()
  ) {
    props.sendToFront(configName, "online");
    return (
      <>
        <Card
          sx={{
            width: 400,
            position: "relative",
            opacity: isDragOver ? 0.5 : 1,
          }}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isDragOver && (
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.8)",
                color: "black",
                zIndex: 1000,
              }}
            >
              <CloudUploadIcon style={{ fontSize: 64 }} />
              <p>Drop file here to upload</p>
            </div>
          )}
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
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isUploading}
        >
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)", // semi-transparent white
            }}
          >
            <CircularProgress style={{ color: "black" }} />
            <div
              style={{ marginTop: "20px", color: "black", fontSize: "1.25rem" }}
            >
              Uploading File...
            </div>
          </Paper>
        </Backdrop>
      </>
    );
  } else {
    props.sendToFront(configName, "offline");
    return <DisconnectedPrinterCard url={url} configName={configName} />;
  }
});
export default PrinterCardRevised;
