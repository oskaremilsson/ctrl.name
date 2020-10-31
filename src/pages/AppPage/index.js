import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import Controller from 'components/Controller';
import SwitchCurrentMe from './parts/SwitchCurrentMe';
import Playlists from './parts/Playlists';

import Settings from './subPages/Settings';
import Playlist from './subPages/Playlist';

import { Settings as SettingsIcon } from '@material-ui/icons';
import { Box, IconButton } from '@material-ui/core';

import api from 'utils/api';
import spotify from 'utils/spotify';
import config from 'config/config.json';

const { getSpotifyPlayerSync } = selectors;

const getAccessToken = (dispatch, username, setAccessToken, setTokenFetched) => {
  var data = new FormData();
  data.append("username", username);

  api.post('getAccessToken', data)
  .then(res => {
    setAccessToken(res.data.Access_token);
    setTokenFetched(true);
    dispatch(actions.setSpotifyPlayerSync(true));
  });
};

const syncNowPlaying = (dispatch, access_token) => {
  spotify(access_token).get('me/player').then(res => {
    dispatch(actions.setSpotifyPlayerSync(false));
    console.log(res);
    if (res.status === 200) {
      dispatch(actions.setSpotifyPlayer(res.data));
    } else {
      dispatch(actions.setSpotifyPlayer(undefined));
    }
  });
}

export default function AppPage(props) {
  const dispatch = useDispatch();
  const playerSync = useSelector((state) => getSpotifyPlayerSync(state));

  const { me, history, location } = props;
  
  const [access_token, setAccessToken] = useState(undefined);
  const [currentMe, setCurrentMe] = useState(me.id);
  const [tokenFetched, setTokenFetched] = useState(false);
  const [syncTimer, setSyncTimer] = useState(undefined);

  useEffect(() => {
    if (!tokenFetched) {
      getAccessToken(dispatch, currentMe, setAccessToken, setTokenFetched);
    }
  }, [dispatch, currentMe, tokenFetched]);

  useEffect(() => {
    if (access_token && playerSync) {
      syncNowPlaying(dispatch, access_token);
    }

    if (!syncTimer) {
      setSyncTimer(
        setInterval(() => {
          dispatch(actions.setSpotifyPlayerSync(true));
        }, config.SPOTIFY_PING_INTERVAL || 30000)
      );
    }
  }, [dispatch, playerSync, access_token, syncTimer]);

  let component;
  console.log(location, history);
  switch (location && location.pathname) {
    case '/settings':
      component = <Settings
          {...props}
        />
      break;
    case '/playlist':
      component = <Playlist
          access_token={access_token}
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
          />

          <Playlists 
            access_token={access_token}
            {...props}
          />
        </Box>
      break;

  }


  return (
    <Box className="AppPage">

      <Controller
        access_token={access_token}
      />

      { component }
      
    </Box>
  );
}
