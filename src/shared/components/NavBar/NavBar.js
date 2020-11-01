import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

import {
  Home as HomeIcon, 
  Settings as SettingsIcon,
  List as ListIcon
} from '@material-ui/icons';

export default function NavBar(props) {
  const { history, location } = props;
  const activePage = location && location.pathname;
  const [value, setValue] = useState(activePage);

  const navigate = (_, newValue) => {
    setValue(newValue);
    history.push(newValue);
  }

  return (
    <BottomNavigation
      value={value}
      onChange={navigate}
      showLabels
    >
      <BottomNavigationAction value="/" label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction value="/playlists" label="Playlists" icon={<ListIcon />} />
      <BottomNavigationAction value="/settings" label="Settings" icon={<SettingsIcon />} />
    </BottomNavigation>
  );
}