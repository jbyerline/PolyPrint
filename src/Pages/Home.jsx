import * as React from "react";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import PrinterCard from "../Cards/PrinterCard";
import InitialSetupDialog from "../Dialog/InitialSetupDialog";
import WelcomeDialog from "../Dialog/WelcomeDialog";

const useStyles = makeStyles(() => ({
  cards: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    margin: "10px",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [printerConfig, setPrinterConfig] = useState();
  const [welcomeOpen, setWelcomeOpen] = React.useState(true);
  const [initialSetUpOpen, setInitialSetUpOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getData = () => {
    fetch("PrinterConfig.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setPrinterConfig(myJson);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [initialSetUpOpen]);

  const handleOpenSetUpDialog = () => {
    setWelcomeOpen(false);
    setInitialSetUpOpen(true);
  };

  const handleCloseSetUpDialog = () => {
    setInitialSetUpOpen(false);
  };

  if (isLoading) {
    return (
      <div>
        <Typography>Loading</Typography>
      </div>
    );
  } else {
    if (printerConfig.printers[0].name !== "Demo Printer 1") {
      if (welcomeOpen === true) {
        setWelcomeOpen(false);
      }
    }
    if (welcomeOpen) {
      return (
        <WelcomeDialog
          isOpen={welcomeOpen}
          openSetupDialog={handleOpenSetUpDialog}
        />
      );
    } else if (initialSetUpOpen) {
      return (
        <InitialSetupDialog
          isOpen={initialSetUpOpen}
          closeDialog={handleCloseSetUpDialog}
        />
      );
    } else {
      return (
        <div className={classes.cards}>
          {printerConfig ? (
            printerConfig.printers.map((printer) => (
              <PrinterCard
                printerName={printer.name}
                octoPrintLink={printer.URL}
                printerApiKey={printer.apiKey}
                key={printer.URL}
              />
            ))
          ) : (
            <p>N/A</p>
          )}
        </div>
      );
    }
  }
};
export default Home;
