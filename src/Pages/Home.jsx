import * as React from "react";
import { makeStyles } from "@mui/styles";

import PrinterCard from "../Cards/PrinterCard";

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
  return (
    <div className={classes.cards}>
      <PrinterCard
        octoPrintLink="https://orusa.byerline.me"
        printerApiKey="F709DCD954D1417B95B9D57014D05357"
        printerThemeColor="orange"
        type="RepRap"
      />
      <PrinterCard
        octoPrintLink="https://grusa.byerline.me"
        printerApiKey="4704A7C866C1436EBF08B6514CBAF149"
        printerThemeColor="green"
        type="RepRap"
      />
      <PrinterCard
        octoPrintLink="https://yender3.byerline.me"
        printerApiKey="10322EDE4D434B1CA2F5679B378285A8"
        printerThemeColor="yellow"
        type="RepRap"
      />
      <PrinterCard
        octoPrintLink="https://cr10.byerline.me"
        printerApiKey="B29E741ADF45415E9FD0372488BE3B6E"
        printerThemeColor="red"
        type="RepRap"
      />
      <PrinterCard
        octoPrintLink="http://ender3.danielburns.me:8080/"
        printerApiKey="3863CCB8919C4D84957897157D964699"
        printerThemeColor="black"
        type="RepRap"
      />
    </div>
  );
};
export default Home;
