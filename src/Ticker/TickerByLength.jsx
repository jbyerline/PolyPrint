import Typography from "@mui/material/Typography";
import * as React from "react";
import Ticker from "react-ticker";

export default function TickerByLength(props) {
  const { text, speed, mode, maxLen } = props;
  if (text.length <= maxLen) {
    return <Typography align="left">{text}</Typography>;
  } else {
    return (
      <div style={{ width: 175 }}>
        <Ticker speed={speed} mode={mode}>
          {() => (
            <Typography align="left" noWrap>
              {text}
            </Typography>
          )}
        </Ticker>
      </div>
    );
  }
}
