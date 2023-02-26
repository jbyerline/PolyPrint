import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { List, Box, Divider, IconButton, Drawer } from "@mui/material";
import { useCallback } from "react";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BuildIcon from "@mui/icons-material/Build";
import PaletteIcon from "@mui/icons-material/Palette";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { styled } from "@mui/material/styles";

import theme from "../../../themes/blueTheme";

import SettingsListItem from "./Subcomponents/SettingsListItem";
import ThemeSettings from "./Subcomponents/ThemeSettings";
import GeneralSettings from "./Subcomponents/GeneralSettings";
import SystemSettings from "./Subcomponents/SystemSettings";

const useStyles = makeStyles(() => ({
  indexNumbers: {
    marginRight: "10px",
  },
}));

const drawerWidth = 150;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const MyDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SettingsDialog(props) {
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isConfirmationPromptOpen, setIsConfirmationPromptOpen] =
    React.useState(false);
  const [isUploadPromptOpen, setIsUploadPromptOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState();
  const [uploadedFile, setUploadedFile] = React.useState();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [settingsComponent, setSettingsComponent] = React.useState(
    <SystemSettings />
  );

  const handleClick = useCallback(
    (file) => () => {
      setSelectedFile({
        name: file.name,
        path: file.path,
        origin: file.origin,
      });
      setIsConfirmationPromptOpen(true);
    },
    []
  );

  const handleFileUpload = ({ target }) => {
    setUploadedFile(target.files[0]);
    setIsUploadPromptOpen(true);
  };

  // const theme = useTheme();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Dialog
      open={props.isOpen}
      fullWidth={true}
      maxWidth="lg"
      fullScreen={fullScreen}
    >
      <DialogTitle variant="h5" align="center">
        Settings
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ display: "flex" }}>
          <MyDrawer
            variant="permanent"
            open={isDrawerOpen}
            PaperProps={{
              style: {
                position: "absolute",
              },
            }}
            anchor="left"
          >
            <DrawerHeader>
              <IconButton onClick={toggleDrawer}>
                {!isDrawerOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <SettingsListItem
                open={isDrawerOpen}
                label="General"
                icon={<BuildIcon />}
                settingComponent={<GeneralSettings />}
                setSettingsComponent={setSettingsComponent}
              />
              <SettingsListItem
                open={isDrawerOpen}
                label="Theme"
                icon={<PaletteIcon />}
                settingComponent={
                  <ThemeSettings
                    themeString={props.themeString}
                    setThemeString={props.setThemeString}
                  />
                }
                setSettingsComponent={setSettingsComponent}
              />
              <SettingsListItem
                open={isDrawerOpen}
                label="System"
                icon={<AdminPanelSettingsIcon />}
                settingComponent={<SystemSettings />}
                setSettingsComponent={setSettingsComponent}
              />
            </List>
          </MyDrawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <div style={{ height: 500 }}>{settingsComponent}</div>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={props.closeDialog}>
          Close
        </Button>
        <Button variant="contained" onClick={props.closeDialog}>
          Save
        </Button>
        {/*<Button component="label">*/}
        {/*  Upload*/}
        {/*  <input*/}
        {/*    onChange={handleFileUpload}*/}
        {/*    type="file"*/}
        {/*    accept=".stl, .gcode, .gco, .g"*/}
        {/*    hidden*/}
        {/*  />*/}
        {/*</Button>*/}
      </DialogActions>
    </Dialog>
  );
}
