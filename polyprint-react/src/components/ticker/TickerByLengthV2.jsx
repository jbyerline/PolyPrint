import * as React from "react";
import Ticker from "react-ticker";

export default function TickerByLengthV2(props) {
  if (props.text.length <= props.maxLen) {
    return props.text;
  } else {
    return (
      <div style={{ whiteSpace: "nowrap", width: "45ch" }}>
        <Ticker speed={props.speed} mode={props.mode}>
          {() => props.text}
        </Ticker>
      </div>
    );
  }
}
