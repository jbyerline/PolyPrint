import * as React from "react";
import IconButton from "@mui/material/IconButton";
import UsbIcon from "@mui/icons-material/Usb";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { UsbOff } from "@mui/icons-material";

export default function ConnectIcon(props) {
  const [connectionInfo, setConnectionInfo] = useState();
  const [dataRefresh, triggerConnectionRefresh] = useState(false);

  useEffect(() => {
    props.dataStore
      .fetchConnectionInfo(props.octoPrintLink, props.apiKey)
      .then((data) => {
        setConnectionInfo(data);
      })
      .catch((err) => console.log("Error retrieving connection info", err));
  }, [dataRefresh]);

  const handleConnect = () => {
    props.dataStore.modifyPrinterConnection(
      props.octoPrintLink,
      props.apiKey,
      "connect"
    );
    // TODO: Add in delay to allow printer to connect before changing icon
    triggerConnectionRefresh(!dataRefresh);
    props.triggerGeneralRefresh();
  };
  const handleDisconnect = () => {
    props.dataStore.modifyPrinterConnection(
      props.octoPrintLink,
      props.apiKey,
      "disconnect"
    );
    // TODO: Add in delay to allow printer to disconnect before changing icon
    triggerConnectionRefresh(!dataRefresh);
    props.triggerGeneralRefresh();
  };

  const connectionState = connectionInfo
    ? connectionInfo[0].current.state
    : "Unknown";

  if (connectionState === "Unknown" || connectionState === "Closed") {
    return (
      <Tooltip title="Connect">
        <IconButton aria-label="connect" onClick={handleConnect}>
          <UsbIcon />
        </IconButton>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Disconnect">
        <IconButton aria-label="Disconnect" onClick={handleDisconnect}>
          <UsbOff />
        </IconButton>
      </Tooltip>
    );
  }
}
