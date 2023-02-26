import Typography from "@mui/material/Typography";
import * as React from "react";
import Ticker from "react-ticker";

export default function TickerByLength(props) {
  const { text, speed, mode, maxLen, divLen, isCardView } = props;
  if (text.length <= maxLen) {
    return (
      <Typography
        align="left"
        style={{ fontSize: isCardView ? "0.875rem" : "1rem" }}
      >
        <nobr>{text}</nobr>
      </Typography>
    );
  } else {
    return (
      <div style={{ width: divLen }}>
        <Ticker speed={speed} mode={mode}>
          {() => (
            <Typography
              align="left"
              noWrap
              style={{ fontSize: isCardView ? "0.875rem" : "1rem" }}
            >
              {text}
            </Typography>
          )}
        </Ticker>
      </div>
    );
  }
}
