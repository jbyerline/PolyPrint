import * as React from "react";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ky from "ky";

import InitialSetupDialog from "../Dialog/InitialSetupDialog";
import WelcomeDialog from "../Dialog/WelcomeDialog";
import PrinterCardRevised from "../Cards/PrinterCardRevised";

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
  const [printerArray, setPrinterArray] = useState();
  const [welcomeOpen, setWelcomeOpen] = React.useState(true);
  const [initialSetUpOpen, setInitialSetUpOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [render, setRender] = useState(false);

  const getData = () => {
    fetch("PrinterConfigLocal.json", {
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
        // Get the public IP of the user
        // TODO: This API "ip-api.com" is free but has a rate limit we may exceed. Try to find alternative?
        const userProm = ky.get("http://ip-api.com/json/").json();
        myJson.printers.forEach((printer, index) => {
          printer.position = index;
          // If user provides both a URL
          if (printer.publicUrl) {
            // Get the public IP of the printer
            const printerProm = ky
              .get(
                "http://ip-api.com/json/" + new URL(printer.publicUrl).hostname
              )
              .json();
            // Once both requests come back
            Promise.allSettled([printerProm, userProm]).then((response) => {
              if (printer.publicUrl && printer.privateIp) {
                // If they are the same WAN
                if (response[0].value.query === response[1].value.query) {
                  console.log("IP Addresses are the same");
                  printer.idealUrl = printer.privateIp;
                } else {
                  console.log("User and Printer are on different WANs");
                  printer.idealUrl = printer.publicUrl;
                }
              } else if (printer.publicUrl) {
                printer.idealUrl = printer.publicUrl;
              } else {
                printer.idealUrl = printer.privateIp;
              }
              // After last printer loads, then set state
              if (index === myJson.printers.length - 1) {
                setPrinterArray(myJson.printers);
                setIsLoading(false);
              }
            });
          }
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
