import Typography from "@mui/material/Typography";
import * as React from "react";

export default function Footer(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a target="_blank" href="https://byerline.me/" rel="noreferrer">
        Jacob Byerline
      </a>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
