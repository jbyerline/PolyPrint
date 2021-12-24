import * as React from "react";
import { makeStyles } from "@mui/styles";

import PrinterCard from "../Cards/PrinterCard";

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

  return (
    <div className={classes.cards}>
      <PrinterCard
        printerName="Prusa"
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
