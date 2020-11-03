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

const { getCurrentMe, getCurrentMeAccessToken, getSpotifyPlayerSync } = selectors;

const getAccessToken = (dispatch, username, setTokenFetched) => {
  var data = new FormData();
  data.append("username", username);

  api.post('getAccessToken', data)
  .then(res => {
    dispatch(actions.setCurrentMeAccessToken(res.data.Access_token));
    setTokenFetched(true);
    dispatch(actions.setSpotifyPlayerSync(true));
  });
};

const syncNowPlaying = (dispatch, access_token) => {
  spotify(access_token).get('me/player').then(res => {
    dispatch(actions.setSpotifyPlayerSync(false));
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
  const currentMe = useSelector((state) => getCurrentMe(state));
  const currentMeAccessToken = useSelector((state) => getCurrentMeAccessToken(state));

  const { location } = props;

  const [tokenFetched, setTokenFetched] = useState(false);
  const [syncTimer, setSyncTimer] = useState(undefined);

  useEffect(() => {
    if (!tokenFetched && currentMe) {
      getAccessToken(dispatch, currentMe.id, setTokenFetched);
    }
  }, [dispatch, currentMe, tokenFetched]);

  useEffect(() => {
    if (currentMeAccessToken && playerSync) {
      syncNowPlaying(dispatch, currentMeAccessToken);
    }

    if (!syncTimer) {
      setSyncTimer(
        setInterval(() => {
          dispatch(actions.setSpotifyPlayerSync(true));
        }, config.SPOTIFY_PING_INTERVAL || 30000)
      );
    }
  }, [dispatch, playerSync, currentMeAccessToken, syncTimer]);

  let component;
  switch (location && location.pathname) {
    case '/profile':
      component = <Profile
          {...props}
        />
      break;
    case '/playlist':
      component = <Playlist
          {...props}
        />
      break;
    case '/playlists':
      component = <Playlists
          {...props}
        />
      break;
    default:
      component =
          <Home
            setTokenFetched={setTokenFetched}
            {...props}
          />
      break;
  }

  return (
    <Box marginBottom={7}>

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
