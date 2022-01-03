import Typography from "@mui/material/Typography";
import * as React from "react";
import Ticker from "react-ticker";

export default function TickerByLength(props) {
  if (props.text.length <= props.maxLen) {
    return <Typography align="right">{props.text}</Typography>;
  } else {
    return (
      <Ticker speed={props.speed} mode={props.mode}>
        {({ index }) => (
          <>
            <Typography align="right">{props.text}</Typography>
          </>
        )}
      </Ticker>
    );
  }
}
