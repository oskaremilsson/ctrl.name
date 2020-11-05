import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import NavBar from 'shared/components/NavBar';

import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Playlists from 'pages/Playlists';

import { Box } from '@material-ui/core';

import api from 'utils/api';

const {
  getCurrentMe,
  getConsents,
  getMyConsents,
  getRequests,
  getMyRequests,
} = selectors;

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
  const consents = useSelector((state) => getConsents(state));
  const myConsents = useSelector((state) => getMyConsents(state));
  const requests = useSelector((state) => getRequests(state));
  const myRequests = useSelector((state) => getMyRequests(state));

  const { location } = props;

  const [tokenFetched, setTokenFetched] = useState(false);

  useEffect(() => {
    if (!tokenFetched && currentMe) {
      getAccessToken(dispatch, currentMe.id, setTokenFetched);
    }
  }, [dispatch, currentMe, tokenFetched]);

  useEffect(() => {
    if (!consents) {
      api.post('getConsents')
      .then(res => {
        dispatch(actions.setConsents(res.data && res.data.Consents));
      });
    }
  }, [dispatch, consents]);

  useEffect(() => {
    if (!myConsents) {
      api.post('getMyConsents')
      .then(res => {
        dispatch(actions.setMyConsents(res.data && res.data.Consents));
      });
    }
  }, [dispatch, myConsents]);

  useEffect(() => {
    if (!requests) {
      api.post('getRequests')
      .then(res => {
        dispatch(actions.setRequests(res.data && res.data.Requests));
      });
    }
  }, [dispatch, requests]);

  useEffect(() => {
    if (!myRequests) {
      api.post('getMyRequests')
      .then(res => {
        dispatch(actions.setMyRequests(res.data && res.data.Requests));
      });
    }
  }, [dispatch, myRequests]);

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
