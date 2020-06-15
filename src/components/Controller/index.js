import React, { useState, useEffect } from 'react';
import PlayButton from './components/PlayButton';
import SkipButton from './components/SkipButton';

import spotify from '../../utils/spotify';

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
      }, 30000)
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
  }, [syncer]);
  
  return (
    <div className="controller">
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
    </div>
  );
}