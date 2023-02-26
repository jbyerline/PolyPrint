import * as React from "react";
import { Paper, Link, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Footer(props) {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 120,
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 1,
          }}
        />
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography variant="caption" color="initial">
            Copyright{" "}
            <Link href="https://byerline.me" target="_blank" rel="noopener">
              Jacob Byerline
            </Link>{" "}
            © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
