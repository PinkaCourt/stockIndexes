import React from "react";
import { Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Toolbar from "@mui/material/Toolbar";

import { Routes } from "common/types";

interface Props {
  tabs: Routes;
  handleOpenDialog: () => void;
}

const AppBarMui = ({ tabs, handleOpenDialog }: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton aria-label="openModal" onClick={handleOpenDialog}>
          <InfoIcon />
        </IconButton>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
        >
          {Object.values(tabs).map(({ path, label }, index) => (
            <Tab
              key={path}
              label={label}
              value={index}
              component={Link}
              to={path}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarMui;
