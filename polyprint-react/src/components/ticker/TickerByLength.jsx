import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState, useEffect } from "react"; // Import useState and useEffect
import Ticker from "react-ticker";

export default function TickerByLength(props) {
  const { text, speed, mode, maxLen, divLen, isCardView } = props;

  // State to control the movement of the ticker
  const [shouldMove, setShouldMove] = useState(false);

  // Effect to delay the start of the ticker movement
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldMove(true);
    }, 5000); // Delay of 5 seconds

    // Cleanup the timer when the component is unmounted or updated
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs once on mount

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
        <Ticker speed={speed} mode={mode} move={shouldMove}>
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
