import * as React from "react";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import ky from "ky";

import InitialSetupDialog from "../components/dialog/InitialSetupDialog";
import WelcomeDialog from "../components/dialog/WelcomeDialog";
import PrinterCardRevised from "../components/cards/PrinterCardRevised";
import OctoprintDataStore from "../datastores/OctoprintDataStore";
import { makeApiUrl } from "../utils/utils";

const useStyles = makeStyles(() => ({
  cards: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    margin: "10px",
  },
  spinnerDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingSpinner: {
    // width: "100vw",
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translateX(-50%) translateY(-50%)",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [printerConfig, setPrinterConfig] = useState();
  const [printerArray, setPrinterArray] = useState();
  const [welcomeOpen, setWelcomeOpen] = React.useState(true);
  const [initialSetUpOpen, setInitialSetUpOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [render, setRender] = useState(false);
  const [dataStores, setDataStores] = useState([]);

  const API_URL = makeApiUrl();

  const createApiInstance = (apiKey) => {
    return ky.extend({
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set("X-Api-Key", apiKey);
          },
        ],
      },
    });
  };

  const getData = () => {
    ky.get(API_URL + "config").then((resp) => {
      resp.json().then((jsonData) => {
        jsonData.printers.forEach((printer, index) => {
          // TODO: Figure out better way to check ip?

          printer.position = index;
          // If user provides both a URL and an IP
          if (printer.publicUrl && printer.privateIp) {
            // Test the private IP to see if it will load
            const api = createApiInstance(printer.apiKey);
            api
              .get(printer.privateIp + "/api/version")
              .json()
              .then(() => {
                // If it loads, then use the IP
                printer.idealUrl = printer.privateIp;
                console.log("Using ip address");
              })
              .catch(() => {
                // Otherwise use the public URL
                printer.idealUrl = printer.publicUrl;
                console.log("Using URL");
              });
          }
          if (index === jsonData.printers.length - 1) {
            setPrinterArray(jsonData.printers);
          }
        });
        let stores = [];
        // Instantiate a new datastore for each printer
        for (let i = 0; i < jsonData.printers.length; i++) {
          stores.push(new OctoprintDataStore(jsonData.printers[i].name));
        }
        setDataStores(stores);
        setPrinterConfig(jsonData);
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    getData();
  }, [initialSetUpOpen]);

  useEffect(() => {
    setRender(!render);
  }, [printerArray]);

  const handleOpenSetUpDialog = () => {
    setWelcomeOpen(false);
    setInitialSetUpOpen(true);
  };

  const handleCloseSetUpDialog = () => {
    setInitialSetUpOpen(false);
  };

  // TODO: Simplify send to front and rework to mitigate render order issue
  const sendPrinterToFront = (name, status) => {
    let arr = printerArray;
    const index = arr.map((i) => i.name).indexOf(name);
    // If a status exists for the printer
    if (arr[index].status) {
      // If the status has changed
      if (arr[index].status !== status) {
        // Update Status
        arr[index].status = status;
      } else {
        // Otherwise, do nothing
        return;
      }
    } else {
      // Create status field if it doesnt exits
      arr[index].status = status;
    }
    // If printer is online
    if (arr[index].status === "online") {
      // Send element to front of arr
      moveToFront(arr, arr[index]);

      // Split array into offline and online sub-arrays and sort them based off of position
      let onlineArray = arr
        .filter((printer) => printer.status === "online")
        .sort(function (a, b) {
          return a.position - b.position;
        });
      let offlineArray = arr
        .filter((printer) => printer.status === "offline")
        .sort(function (a, b) {
          return a.position - b.position;
        });

      // Combine the two arrays and rerender
      setPrinterArray(onlineArray.concat(offlineArray));
    }
  };

  const moveToFront = (arr, queryStr) =>
    arr.reduce((acc, curr) => {
      if (queryStr === curr) {
        return [curr, ...acc];
      }
      return [...acc, curr];
    }, []);

  if (isLoading) {
    return (
      <div className={classes.loadingSpinner}>
        <Stack alignItems="center" justifyContent="center" spacing={4}>
          <CircularProgress />
          <Typography>Loading Printers...</Typography>
        </Stack>
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
          {printerArray ? (
            printerArray.map((printer) => (
              <PrinterCardRevised
                configName={printer.name}
                url={
                  printer.idealUrl
                    ? printer.idealUrl
                    : printer.publicUrl
                    ? printer.publicUrl
                    : printer.privateIp
                }
                apiKey={printer.apiKey}
                hasOctolight={printer.octoLight ? printer.octoLight : false}
                configColor={printer.colorCode ? printer.colorCode : false}
                isCnc={printer.isCNC ? printer.isCNC : false}
                sendToFront={sendPrinterToFront}
                key={printer.apiKey}
                render={render}
                datastore={
                  dataStores.filter((store) => store.name === printer.name)[0]
                }
                config={printerConfig}
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
