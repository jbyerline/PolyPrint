import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles(() => ({
  cards: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    margin: "10px",
  },
}));

export default function Help() {
  const classes = useStyles();

  return (
    <div className={classes.cards}>
      <Typography>FAQ's</Typography>
    </div>
  );
}
