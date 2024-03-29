import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

import LinearProgressWithLabel from "../../progress/LinearProgressWithLabel";
import TickerByLength from "../../ticker/TickerByLength";
import { keyExists } from "../../../utils/utils";

function secondsToDhms(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + "d " : "";
  const hDisplay = h + "h ";
  const mDisplay = m + "m ";
  const sDisplay = s + "s";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
export default function InfoTable(props) {
  const { jobStatus, printerStatus, isCnc } = props;

  return (
    <Table size="small">
      <TableBody>
        <TableRow>
          <TableCell variant="head">
            <strong>Print Name</strong>
          </TableCell>
          <TableCell>
            <TickerByLength
              text={
                jobStatus().job.file.name
                  ? jobStatus().job.file.display
                  : "File Not Selected"
              }
              maxLen={23}
              speed={3}
              mode="await"
              divLen={175}
              isCardView={true}
            />
          </TableCell>
        </TableRow>
        {!isCnc ? (
          <>
            <TableRow>
              <TableCell variant="head">
                <strong>Hotend Temp</strong>
              </TableCell>
              <TableCell>
                {keyExists(printerStatus(), "actual")
                  ? printerStatus().temperature.tool0.actual
                  : "0"}{" "}
                /{" "}
                {keyExists(printerStatus(), "target")
                  ? printerStatus().temperature.tool0.target
                  : "0"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">
                <strong>Bed Temp</strong>
              </TableCell>
              <TableCell>
                {keyExists(printerStatus(), "actual")
                  ? printerStatus().temperature.bed.actual
                  : "0"}{" "}
                /{" "}
                {keyExists(printerStatus(), "target")
                  ? printerStatus().temperature.bed.target
                  : "0"}
              </TableCell>
            </TableRow>
          </>
        ) : null}

        <TableRow>
          <TableCell variant="head">
            <strong>Time Elapsed</strong>
          </TableCell>
          <TableCell>{secondsToDhms(jobStatus().progress.printTime)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">
            <strong>Time Left</strong>
          </TableCell>
          <TableCell>
            {secondsToDhms(jobStatus().progress.printTimeLeft)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">
            <strong>Progress</strong>
          </TableCell>
          <TableCell>
            <LinearProgressWithLabel value={jobStatus().progress.completion} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
