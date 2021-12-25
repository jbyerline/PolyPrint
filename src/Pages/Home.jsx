import * as React from "react";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { Button } from "@mui/material";

import PrinterCard from "../Cards/PrinterCard";
import InfoDatastore from "../Store/InfoDataStore";
import ConnectionsStore from "../Store/ConnectionsStore";

const useStyles = makeStyles((theme) => ({
  cards: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    margin: "10px",
  },
}));

export default function Home() {
  const classes = useStyles();
  const infoDatastore = new InfoDatastore();

  const [refresh, setRefresh] = React.useState(false);

  useEffect(async () => {
    await infoDatastore.fetchGeneralInfo();
    console.log(JSON.stringify(infoDatastore.generalInfo));
  }, []);

  const handleDataRefresh = () => {
    console.log(infoDatastore.generalInfo.profiles._default.name);
    setRefresh(!refresh);
  };

  return (
    <div className={classes.cards}>
      <Button onClick={handleDataRefresh}>Click me to refresh</Button>
      <PrinterCard
        printerName={infoDatastore.generalInfo.profiles["_default"].name}
        status="Offline"
        printerThemeColor="blue"
        octoPrintLink="https://mk3s.byerline.me"
        type="RepRap"
      />
      <PrinterCard
        printerName="Ender 3"
        status="Online"
        printerThemeColor="pink"
        type="RepRap"
      />
      <PrinterCard
        printerName="Prusa"
        status="Offline"
        printerThemeColor="yellow"
        type="RepRap"
      />
      <PrinterCard
        printerName="Ender 3"
        status="Online"
        printerThemeColor="orange"
        type="RepRap"
      />
      <PrinterCard
        printerName="Prusa"
        status="Offline"
        printerThemeColor="green"
        type="RepRap"
      />
      <PrinterCard
        printerName="Ender 3"
        status="Online"
        printerThemeColor="black"
        type="RepRap"
      />
      <PrinterCard
        printerName="Prusa"
        status="Offline"
        printerThemeColor="gray"
        type="RepRap"
      />
      <PrinterCard
        printerName="Ender 3"
        status="Online"
        printerThemeColor="gold"
        type="RepRap"
      />
    </div>
  );
}
