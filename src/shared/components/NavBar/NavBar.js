import React, { useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

import {
  Home as HomeIcon, 
  AccountCircle as AccountCircleIcon,
  ArtTrack as ArtTrackIcon
} from '@material-ui/icons';

export default function NavBar(props) {
  const { history, location } = props;
  const [value, setValue] = useState();

  const navigate = (_, newValue) => {
    history.push(newValue);
  }

  useEffect(() => {
    if (location && location.pathname) {
      setValue(location.pathname);
    }
  }, [location]);

  return (
    <BottomNavigation
      value={value}
      onChange={navigate}
      showLabels
    >
      <BottomNavigationAction value="/" label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction value="/playlists" label="Playlists" icon={<ArtTrackIcon />} />
      <BottomNavigationAction value="/profile" label="Profile" icon={<AccountCircleIcon />} />
    </BottomNavigation>
  );
}