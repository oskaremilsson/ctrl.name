import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from 'shared/stores';

import { Box } from '@material-ui/core';

import App from 'App';
import LandingPage from 'pages/LandingPage';
import LoadingPage from 'pages/LoadingPage';

import spotify from 'utils/spotify';

export default function Bouncer(props) {
  const dispatch = useDispatch();
  const { history } = props;
  const my_tokens = JSON.parse(localStorage.getItem('my_tokens'));
  const [loggedIn, setLoggedIn] = useState(undefined);

  useEffect(() => {
    if (my_tokens && !loggedIn) {
      spotify(my_tokens.access_token).get('me')
      .then(res => {
        setLoggedIn(true);
        dispatch(actions.setMe(res.data));
        dispatch(actions.setCurrentMe(res.data));
      }).catch(_ => {
        localStorage.clear();
        history.replace('/');
      });
    }
  }, [dispatch, my_tokens, loggedIn, history]);

  let component;
  if (my_tokens && !loggedIn) {
    component = <LoadingPage {...props} />
  } else if (loggedIn) {
    component = <App {...props} />
  } else {
    component = <LandingPage {...props} />
  }

  return (
    <Box>
      { component }
    </Box>
  );
}
