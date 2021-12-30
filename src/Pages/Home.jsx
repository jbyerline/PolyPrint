import * as React from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { Button } from "@mui/material";

import PrinterCard from "../Cards/PrinterCard";
import InfoDatastore from "../Store/InfoDataStore";

const infoDatastore = new InfoDatastore();

const useStyles = makeStyles((theme) => ({
  cards: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    margin: "10px",
  },
}));

const Home = observer(() => {
  const classes = useStyles();
  const [refresh, setRefresh] = React.useState(false);
  const [generalInfo, setGeneralInfo] = React.useState(false);

  useEffect(() => {
    infoDatastore.fetchGeneralInfo();
    console.log(JSON.stringify(infoDatastore.generalInfo));
  }, []);

  return (
    <div className={classes.cards}>
      <PrinterCard
        printerName="Orusa"
        status="Offline"
        printerThemeColor="orange"
        octoPrintLink="https://mk3s.byerline.me"
        type="RepRap"
      />
      <PrinterCard
        printerName="Yender 3"
        status="Online"
        printerThemeColor="yellow"
        octoPrintLink="https://yender3.byerline.me"
        type="RepRap"
      />
      <PrinterCard
        printerName="CR-10"
        status="Offline"
        printerThemeColor="red"
        octoPrintLink="https://cr10.byerline.me"
        type="RepRap"
      />
      <PrinterCard
        printerName="Daniel's Ender 3"
        status="Online"
        printerThemeColor="black"
        octoPrintLink="http://ender3.danielburns.me:8080/"
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
});
export default Home;
