import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import NavBar from 'shared/components/NavBar';

import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Playlists from 'pages/Playlists';

import { Box } from '@material-ui/core';

import api from 'utils/api';

const { getCurrentMe } = selectors;

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

export default function App(props) {
  const dispatch = useDispatch();
  const currentMe = useSelector((state) => getCurrentMe(state));

  const { location } = props;

  const [tokenFetched, setTokenFetched] = useState(false);

  useEffect(() => {
    if (!tokenFetched && currentMe) {
      getAccessToken(dispatch, currentMe.id, setTokenFetched);
    }
  }, [dispatch, currentMe, tokenFetched]);

  let component;
  switch (location && location.pathname) {
    case '/profile':
      component = <Profile
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
