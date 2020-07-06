import React, { useState, useEffect } from 'react';
import Controller from '../../components/Controller';
import SwitchCurrentMe from './parts/SwitchCurrentMe';
import Playlists from './parts/Playlists';

import Settings from './subPages/Settings';

import { Settings as SettingsIcon } from '@material-ui/icons';
import { Box, IconButton } from '@material-ui/core';

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

const syncNowPlaying = (access_token, setPlayer, setSyncer) => {
  spotify(access_token).get('me/player').then(res => {
    setSyncer(false);
    console.log(res);
    if (res.status === 200) {
      setPlayer(res.data);
    } else {
      setPlayer(undefined);
    }
  });
}

export default function AppPage(props) {
  const { me, history, location } = props;
  
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
      syncNowPlaying(access_token, setPlayer, setSyncer);
    }

    if (!syncTimer) {
      setSyncTimer(
        setInterval(() => {
          setSyncer(true);
        }, config.SPOTIFY_PING_INTERVAL || 30000)
      );
    }
  }, [syncer, access_token, syncTimer]);

  let component;
  switch (location && location.pathname) {
    case '/settings':
      component = <Settings
          {...props}
        />
      break;
    default:
      component = <Box>
          <IconButton onClick={ () => history.push('settings') }>
            <SettingsIcon />
          </IconButton>

          <SwitchCurrentMe
            me={me}
            currentMe={currentMe}
            setCurrentMe={setCurrentMe}
            setTokenFetched={setTokenFetched}
            setSyncer={setSyncer}
          />

          <Playlists 
            setSyncer={setSyncer}
            access_token={access_token}
          />
        </Box>
      break;

  }


  return (
    <Box className="AppPage">

      <Controller
        syncer={syncer}
        setSyncer={setSyncer}
        access_token={access_token}
        player={player}
      />

      { component }
      
    </Box>
  );
}