import React from "react";
import { Table, TableCell, TableRow } from "@mui/material";

import LinearProgressWithLabel from "../../Progress/LinearProgressWithLabel";
import TickerByLength from "../../Ticker/TickerByLength";

export default function InfoTable(props) {
  const { jobStatus, printerStatus, isCnc } = props;

  return (
    <Table size="small">
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
              {printerStatus().temperature.tool0.actual} /{" "}
              {printerStatus().temperature.tool0.target}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">
              <strong>Bed Temp</strong>
            </TableCell>
            <TableCell>
              {printerStatus().temperature.bed.actual} /{" "}
              {printerStatus().temperature.bed.target}
            </TableCell>
          </TableRow>
        </>
      ) : null}

      <TableRow>
        <TableCell variant="head">
          <strong>Time Elapsed</strong>
        </TableCell>
        <TableCell>
          {new Date(jobStatus().progress.printTime * 1000)
            .toISOString()
            .slice(11, 19)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell variant="head">
          <strong>Time Remaining</strong>
        </TableCell>
        <TableCell>
          {new Date(jobStatus().progress.printTimeLeft * 1000)
            .toISOString()
            .slice(11, 19)}
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
    </Table>
  );
}
