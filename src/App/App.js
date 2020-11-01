import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import NavBar from 'shared/components/NavBar';

import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Playlists from 'pages/Playlists';
import Playlist from 'pages/Playlist';

import { Box } from '@material-ui/core';

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

export default function App(props) {
  const dispatch = useDispatch();
  const playerSync = useSelector((state) => getSpotifyPlayerSync(state));

  const { me, location } = props;
  
  const [access_token, setAccessToken] = useState(undefined);
  const [currentMe, setCurrentMe] = useState(me);
  const [tokenFetched, setTokenFetched] = useState(false);
  const [syncTimer, setSyncTimer] = useState(undefined);

  useEffect(() => {
    if (!tokenFetched && currentMe) {
      getAccessToken(dispatch, currentMe.id, setAccessToken, setTokenFetched);
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
  switch (location && location.pathname) {
    case '/profile':
      component = <Profile
          {...props}
        />
      break;
    case '/playlist':
      component = <Playlist
          access_token={access_token}
          {...props}
        />
      break;
    case '/playlists':
      component = <Playlists
          access_token={access_token}
          {...props}
        />
      break;
    default:
      component =
          <Home
            me={me}
            access_token={access_token}
            currentMe={currentMe}
            setCurrentMe={setCurrentMe}
            setTokenFetched={setTokenFetched}
            {...props}
          />
      break;
  }

  return (
    <Box marginBottom={5}>

      { component }
      
      <Box
        position="fixed"
        bottom={0}
        width="100%"
      >
        <NavBar {...props} />
      </Box>
    </Box>
  );
}
