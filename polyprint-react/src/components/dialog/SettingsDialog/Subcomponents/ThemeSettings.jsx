import React from "react";
import { FormControl, InputLabel, List, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import Setting from "./Setting";

export default function ThemeSettings(props) {
  const [themeStr, setThemeStr] = React.useState(props.themeString);

  const handleChange = (event) => {
    const val = event.target.value;
    props.setThemeString(val);
    setThemeStr(val);
  };

  return (
    <List>
      <Setting
        title="Set Theme"
        description="Select your desired theme from the drop down."
        actionComponent={
          <div style={{ width: "150px" }}>
            <FormControl fullWidth={true}>
              <InputLabel id="theme-label">Theme</InputLabel>
              <Select
                labelId="theme-label"
                value={themeStr}
                label="Theme"
                onChange={handleChange}
              >
                <MenuItem value="Red">Red</MenuItem>
                <MenuItem value="Green">Green</MenuItem>
                <MenuItem value="Blue">Blue</MenuItem>
              </Select>
            </FormControl>
          </div>
        }
      />
    </List>
  );
}
