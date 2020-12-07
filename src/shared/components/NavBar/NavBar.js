import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectors } from "shared/stores";

import {
  makeStyles,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
} from "@material-ui/core";

import {
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
  ArtTrack as ArtTrackIcon,
  Search as SearchIcon,
} from "@material-ui/icons";

const { getRequests } = selectors;

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.background.default}`,
  },
  spacing: {
    background: theme.palette.background.paper,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState();

  const requests = useSelector((state) => getRequests(state));

  const navigate = (_, newValue) => {
    history.push(newValue);
  };

  useEffect(() => {
    if (location && location.pathname) {
      setValue(location.pathname);
    }
  }, [location]);

  return (
    <Box paddingBottom={1} className={classes.spacing}>
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
          icon={
            <Badge badgeContent={requests?.length} color="secondary">
              <AccountCircleIcon />
            </Badge>
          }
        />
      </BottomNavigation>
    </Box>
  );
}
