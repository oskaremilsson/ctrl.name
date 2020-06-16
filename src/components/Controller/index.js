import React from 'react';
import PlayButton from './components/PlayButton';
import SkipButton from './components/SkipButton';

import { Box } from '@material-ui/core';

import './style.css';

export default function Controller(props) {
  const { setSyncer, player } = props;
  
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      bottom={3}
      width="100%"
    >
      <SkipButton
        {...props}
        player={player}
        setSyncer={setSyncer}
        action={"previous"}
        icon={"skip_previous"}
      />
      <PlayButton {...props} player={player} setSyncer={setSyncer} />
      <SkipButton
        {...props}
        player={player}
        setSyncer={setSyncer}
        action={"next"}
        icon={"skip_next"}
      />
    </Box>
  );
}