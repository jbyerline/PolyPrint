import * as React from "react";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

import PrinterCard from "../Cards/PrinterCard";
import InitialSetupDialog from "../Dialog/InitialSetupDialog";

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
  const [initialSetUpOpen, setInitialSetUpOpen] = React.useState(false);

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
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCloseSetUpDialog = () => {
    setInitialSetUpOpen(false);
  };

  if (printerConfig && printerConfig.printers[0].name === "Demo Printer") {
    if (initialSetUpOpen === false) {
      setInitialSetUpOpen(true);
    }
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
            // eslint-disable-next-line react/jsx-key
            <PrinterCard
              printerName={printer.name}
              octoPrintLink={printer.URL}
              printerApiKey={printer.apiKey}
            />
          ))
        ) : (
          <p>N/A</p>
        )}
      </div>
    );
  }
};
export default Home;
