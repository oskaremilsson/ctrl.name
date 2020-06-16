import React, { useState, useEffect } from 'react';
import PlayButton from './components/PlayButton';
import SkipButton from './components/SkipButton';

import { Box } from '@material-ui/core';
import spotify from '../../utils/spotify';
import config from '../../config/config.json';

import './style.css';

const syncNowPlaying = (access_token, setPlayer, setSyncer, syncTimer, setSyncTimer) => {
  spotify(access_token).get('me/player').then(res => {
    setSyncer(false);
    console.log(res);
    if (res.status === 200) {
      setPlayer(res.data);
    } else {
      setPlayer(undefined);
    }

    clearTimeout(syncTimer);
    setSyncTimer(
      setTimeout(() => {
        setSyncer(true);
        setSyncTimer(undefined);
      }, config.SPOTIFY_PING_INTERVAL || 30000)
    );
  });
}

export default function Controller(props) {
  const [syncer, setSyncer] = useState(true);
  const [syncTimer, setSyncTimer] = useState(undefined);
  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    if (props.access_token && syncer) {
      syncNowPlaying(props.access_token, setPlayer, setSyncer, syncTimer, setSyncTimer);
    }
  }, [syncer, props.access_token, syncTimer]);
  
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