import React, { useState, useEffect } from 'react';
import Controller from '../../components/Controller';
import SwitchCurrentMe from './parts/SwitchCurrentMe';
import GiveConsent from './parts/GiveConsent';
import Playlists from './parts/Playlists';
import { Box } from '@material-ui/core'

import api from '../../utils/api';
import spotify from '../../utils/spotify';
import config from '../../config/config.json';

const getAccessToken = (username, setAccessToken, setTokenFetched, setSyncer) => {
  var data = new FormData();
  data.append("username", username);

  api.post('getAccessToken', data)
  .then(res => {
    setAccessToken(res.data.Access_token);
    setTokenFetched(true);
    setSyncer(true);
  });
};

const syncNowPlaying = (access_token, setPlayer, setSyncer, syncTimer, setSyncTimer) => {
  spotify(access_token).get('me/player').then(res => {
    setSyncer(false);
    console.log(res);
    if (res.status === 200) {
      setPlayer(res.data);
    } else {
      setPlayer(undefined);
    }

    /* Syncs twize for some reason */
    clearTimeout(syncTimer);
    setSyncTimer(
      setTimeout(() => {
        setSyncer(true);
        setSyncTimer(undefined);
      }, config.SPOTIFY_PING_INTERVAL || 30000)
    );
  });
}

export default function AppPage(props) {
  const { me } = props;
  
  const [access_token, setAccessToken] = useState(undefined);
  const [currentMe, setCurrentMe] = useState(me.id);
  const [tokenFetched, setTokenFetched] = useState(false);
  const [syncer, setSyncer] = useState(true);
  const [syncTimer, setSyncTimer] = useState(undefined);
  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    if (!tokenFetched) {
      getAccessToken(currentMe, setAccessToken, setTokenFetched, setSyncer);
    }
  }, [currentMe, tokenFetched]);

  useEffect(() => {
    if (access_token && syncer) {
      syncNowPlaying(access_token, setPlayer, setSyncer, syncTimer, setSyncTimer);
    }
  }, [syncer, access_token, syncTimer]);


  return (
    <Box className="AppPage">
      <Controller
        syncer={syncer}
        setSyncer={setSyncer}
        access_token={access_token}
        player={player}
      />

      <SwitchCurrentMe
        me={me}
        currentMe={currentMe}
        setCurrentMe={setCurrentMe}
        setTokenFetched={setTokenFetched}
        setSyncer={setSyncer}
      />

      <GiveConsent />

      <Playlists 
        setSyncer={setSyncer}
        access_token={access_token}
      />
    </Box>
  );
}