import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import NavBar from 'shared/components/NavBar';

import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Playlists from 'pages/Playlists';
import Search from 'pages/Search';

import FetchConsents from './components/FetchConsents';

import { Box } from '@material-ui/core';

import api from 'utils/api';

const { getCurrentMe, getCurrentMeAccessToken } = selectors;

const getAccessToken = (dispatch, username) => {
  var data = new FormData();
  data.append("username", username);

  api.post('getAccessToken', data)
  .then(res => {
    dispatch(actions.setCurrentMeAccessToken(res.data.Access_token));
    dispatch(actions.setSpotifyPlayerSync(true));
  });
};

export default function App(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  const currentMe = useSelector((state) => getCurrentMe(state));
  const currentMeAccessToken = useSelector((state) => getCurrentMeAccessToken(state));

  useEffect(() => {
    if (!currentMeAccessToken && currentMe) {
      getAccessToken(dispatch, currentMe.id);
    }
  }, [dispatch, currentMe, currentMeAccessToken]);

  let component;
  switch (location && location.pathname) {
    case '/profile':
      component = <Profile />
      break;
    case '/playlists':
      component = <Playlists />
      break;
    case '/search':
      component = <Search />
      break;
    default:
      component =
          <Home />
      break;
  }

  return (
    <Box marginBottom={7}>

      { component }

      <Box
        position="fixed"
        bottom={0}
        width="100%"
        zIndex={2}
      >
        <NavBar {...props} />
      </Box>
      <FetchConsents />
    </Box>
  );
}
