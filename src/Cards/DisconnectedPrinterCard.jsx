import React from "react";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

export default function DisconnectedPrinterCard(props) {
  const { url, configName } = props;

  const redirectToOctoPrintURL = () => {
    window.open(url, "_blank");
  };

  return (
    <Card sx={{ width: 400 }}>
      <CardHeader title="Printer Unavailable" />
      <CardContent>
        <Typography>Unable to connect to:</Typography>
        <Typography variant="h6">{configName}</Typography>
        <Button variant="text" onClick={redirectToOctoPrintURL}>
          URL: {url}
        </Button>
        <Typography>OctoPrint is most likely powered off</Typography>
      </CardContent>
    </Card>
  );
}
