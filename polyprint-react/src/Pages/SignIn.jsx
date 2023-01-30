import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Collapse } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ky from "ky";

import theme from "../appTheme";

export default function SignIn() {
  const history = useHistory();

  const [formUsername, setUsername] = React.useState("");
  const [formPassword, setPassword] = React.useState("");
  const [alertIsOpen, setAlertIsOpen] = React.useState(false);

  const API_URL =
    process.env.REACT_APP_API_HOST + ":" + process.env.REACT_APP_API_PORT + "/";

  const login = () => {
    ky.post(API_URL + "login", {
      json: { username: formUsername, password: formPassword },
    }).then((resp) => {
      if (resp.status === 200) {
        localStorage.setItem("name", "PolyPrint");
        localStorage.setItem("session", "active");
        history.push("/");
      } else {
        console.log("Login unsuccessful");
        setAlertIsOpen(true);
      }
    });
  };

  function handleSubmit() {
    login();
  }

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: "50px" }}>
        <Collapse in={alertIsOpen}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertIsOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Login Failed
          </Alert>
        </Collapse>
      </div>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label="Username"
            name="user"
            autoComplete="user"
            autoFocus
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Link to="/help" variant="body2">
                Need Help? Check out our FAQ
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
