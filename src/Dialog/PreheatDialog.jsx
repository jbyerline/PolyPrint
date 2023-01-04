import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ButtonGroup, TextField } from "@mui/material";

export default function PreheatDialog(props) {
  const [nozzleTemp, setNozzleTemp] = React.useState(0);
  const [bedTemp, setBedTemp] = React.useState(0);

  const handleNozzleChange = (event) => {
    setNozzleTemp(parseInt(event.target.value));
  };

  const handleBedChange = (event) => {
    setBedTemp(parseInt(event.target.value));
  };

  const handleSetTemps = () => {
    props.datastore.heatNozzle(props.octoprintUrl, props.apiKey, nozzleTemp);
    props.datastore.heatBed(props.octoprintUrl, props.apiKey, bedTemp);
    props.closeDialog();
  };

  const handleSetOff = () => {
    setBedTemp(0);
    setNozzleTemp(0);
  };

  const handleSetPLA = () => {
    setBedTemp(65);
    setNozzleTemp(210);
  };

  const handleSetPETG = () => {
    setBedTemp(85);
    setNozzleTemp(230);
  };

  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.closeDialog}>
        <DialogTitle>Preheat {props.printerName}</DialogTitle>
        <DialogContent>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={handleSetOff}>Off</Button>
            <Button onClick={handleSetPLA}>PLA</Button>
            <Button onClick={handleSetPETG}>PETG</Button>
          </ButtonGroup>
        </DialogContent>
        <DialogContent>
          <TextField
            value={nozzleTemp}
            onChange={handleNozzleChange}
            helperText="Please enter nozzle temp"
            type="number"
          />
        </DialogContent>
        <DialogContent>
          <TextField
            value={bedTemp}
            onChange={handleBedChange}
            helperText="Please enter bed temp"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.closeDialog}>
            Cancel
          </Button>
          <Button autoFocus onClick={handleSetTemps}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
