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
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import ConnectionsStore from "../Store/ConnectionsStore";

const useStyles = makeStyles((theme) => ({
  grid: {
    textAlign: "center",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const connection = new ConnectionsStore();

  const [alertIsOpen, setAlertIsOpen] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await connection.login(
        data.get("user"),
        data.get("password"),
        true
      );
      localStorage.setItem("name", response.name);
      localStorage.setItem("session", response.session);
      history.push("/");
    } catch (e) {
      console.log("Login unsuccessful \n", e);
      setAlertIsOpen(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
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
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
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
