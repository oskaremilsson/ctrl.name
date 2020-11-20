import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
  ArtTrack as ArtTrackIcon,
  Search as SearchIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.background.default}`,
    boxShadow: "0px 4px 4px 6px rgba(0,0,0,0.2)",
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState();

  const navigate = (_, newValue) => {
    history.push(newValue);
  };

  useEffect(() => {
    if (location && location.pathname) {
      setValue(location.pathname);
    }
  }, [location]);

  return (
    <BottomNavigation
      className={classes.root}
      value={value}
      onChange={navigate}
      showLabels
    >
      <BottomNavigationAction value="/" label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction
        value="/playlists"
        label="Playlists"
        icon={<ArtTrackIcon />}
      />
      <BottomNavigationAction
        value="/search"
        label="Search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        value="/profile"
        label="Profile"
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
}
